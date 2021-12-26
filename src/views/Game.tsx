import React, { useEffect } from 'react'
import { DeckHero } from '../components/DeckHero'
import {
	clearBoard,
	opponentInits,
	opponentReacts,
	removeCard,
	shuffleCards,
} from '../store/slices/cardsSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { DeckOpponent } from '../components/DeckOpponent'
import { Board } from '../components/Board'
import { setPlayerNames } from '../store/slices/nameSlice'
import { Card } from '../types'
import {
	disableActing,
	enableActing,
	selectCommon,
} from '../store/slices/commonSlice'
import { delay } from '../utils'
import {
	getLoserIndex,
	selectGame,
	setCurrentLoser,
	setInitPlayer,
} from '../store/slices/gameSlice'
import { incrementCurrentScore } from '../store/slices/scoreSlice'

const OPPONENTS_COUNT = 3

export const Game = () => {
	const dispatch = useAppDispatch()
	// Zda hrac muze provest akci
	const { canHeroAct } = useAppSelector(selectCommon)
	const { initPlayer } = useAppSelector(selectGame)

	useEffect(() => {
		// Inicializace karet
		dispatch(shuffleCards())
		// Nastaveni jmen protihracu pri inicializaci
		dispatch(setPlayerNames())
	}, [dispatch])

	async function allOpponentsInit(initPlayerIndex: number) {
		// calculates villains count to act
		const opponentsToAct = OPPONENTS_COUNT - initPlayerIndex
		dispatch(opponentInits(initPlayerIndex))
		// forces opponents to make their initializing moves
		for (let i = 1; i < opponentsToAct; i++) {
			// editting their order based on the initilizing player
			const marginIndex = (i + initPlayerIndex) % 4
			await delay()
			dispatch(opponentReacts(marginIndex))
		}
		dispatch(enableActing())
	}

	// Reakce protihracu
	async function allOpponentsReact() {
		const opponentsToReact = [0, 1, 2].slice(0, initPlayer)
		for (const i of opponentsToReact) {
			await delay()
			dispatch(opponentReacts(i))
		}
	}

	// Tah hrace
	async function handleHeroClick(card: Card) {
		if (!canHeroAct) return

		// Odstrani danou kartu z hracova balicku a priradi do boardu
		dispatch(removeCard({ playerIndex: 3, card }))
		// Pozastavi moznost akce hrace
		dispatch(disableActing())
		await allOpponentsReact()
		const loserIndex = dispatch(getLoserIndex()) as number
		// Nastavi aktualniho losera
		dispatch(setCurrentLoser({ playerIndex: loserIndex }))
		// Nastavi vynasejiciho hrace
		dispatch(setInitPlayer({ playerIndex: loserIndex }))
		dispatch(incrementCurrentScore({ playerIndex: loserIndex }))
		await delay(2000)
		// Vymaze karty z boardu
		dispatch(clearBoard())

		if (loserIndex === 3) {
			// Opetovne umozni moznost akce hrace
			dispatch(enableActing())
		} else {
			// Vynos protihracu
			allOpponentsInit(loserIndex)
		}
	}

	return (
		<div className="game-area">
			<div className="opponents-wrapper">
				{[0, 1, 2].map(index => (
					<DeckOpponent key={index} opponentIndex={index} />
				))}
			</div>
			<Board />
			<DeckHero onClick={handleHeroClick} />
		</div>
	)
}

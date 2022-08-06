import React, { useCallback, useEffect, useState } from 'react'
import { DeckHero } from '../components/DeckHero'
import {
	clearBoard,
	opponentInits,
	opponentReacts,
	removeCard,
	selectCards,
	shuffleCards,
} from '../store/slices/cardsSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { DeckOpponent } from '../components/DeckOpponent'
import { Board } from '../components/Board'
import { Card } from '../types'
import { disableActing, enableActing } from '../store/slices/commonSlice'
import { delay, isFlushValid } from '../utils'
import {
	getLoserIndex,
	selectGame,
	setCurrentLoser,
	setInitPlayer,
} from '../store/slices/gameSlice'
import { incrementCurrentScore } from '../store/slices/scoreSlice'

const OPPONENTS_COUNT = 3

interface GameProps {
	playerNames: string[]
}

export const Game = ({ playerNames }: GameProps) => {
	const dispatch = useAppDispatch()
	// Zda hrac muze provest akci
	const { initPlayer, round } = useAppSelector(selectGame)
	const { cards, boardCards } = useAppSelector(selectCards)
	const [canHeroAct, setCanHeroAct] = useState(false)

	const allOpponentsInit = useCallback(
		async (initPlayerIndex: number) => {
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
		},
		[dispatch]
	)

	// Reakce protihracu
	async function allOpponentsReact() {
		const opponentsToReact = [0, 1, 2].slice(0, initPlayer)
		for (const i of opponentsToReact) {
			await delay()
			dispatch(opponentReacts(i))
		}
	}

	// MOUNT
	useEffect(() => {
		// Inicializace karet
		dispatch(shuffleCards())

		// Vynos protihracu
		allOpponentsInit(round)
	}, [dispatch, allOpponentsInit, round])

	// Tah hrace
	async function handleHeroClick(card: Card) {
		// Akce zakazana
		if (!canHeroAct) return

		const heroCards = cards[3]
		const initCard = boardCards[initPlayer]
		// Pokud hrac neprizna barvu => return
		if (initPlayer !== 3 && !isFlushValid(card, heroCards, initCard)) return

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

		// konec hry
		if (heroCards.length === 1) {
			dispatch(shuffleCards())
			dispatch(setInitPlayer({ playerIndex: round }))
			dispatch(setCurrentLoser({ playerIndex: -1 }))
			if (round === 3) {
				dispatch(enableActing())
			} else {
				allOpponentsInit(round)
			}
			return
		}

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
					<DeckOpponent
						key={index}
						playerNames={playerNames}
						opponentIndex={index}
					/>
				))}
			</div>
			<Board />
			<DeckHero onClick={handleHeroClick} />
		</div>
	)
}

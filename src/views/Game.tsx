import React, { useEffect } from 'react'
import { DeckHero } from '../components/DeckHero'
import {
	clearBoard,
	opponentActs,
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
import { setInitPlayer } from '../store/slices/gameSlice'

export const Game = () => {
	const dispatch = useAppDispatch()
	// Zda hrac muze provest akci
	const { canHeroAct } = useAppSelector(selectCommon)

	useEffect(() => {
		// Inicializace karet
		dispatch(shuffleCards())
		// Nastaveni jmen protihracu pri inicializaci
		dispatch(setPlayerNames())
	}, [dispatch])

	// Reakce protihracu
	async function allOpponentsAct() {
		for (const i of [0, 1, 2]) {
			await delay()
			dispatch(opponentActs(i))
		}
	}

	// Tah hrace
	async function handleHeroClick(card: Card) {
		if (!canHeroAct) return

		// Nastavi vynasejiciho hrace
		dispatch(setInitPlayer({ playerIndex: 3 }))
		// Odstrani danou kartu z hracova balicku a priradi do boardu
		dispatch(removeCard({ playerIndex: 3, card }))
		// Pozastavi moznost akce hrace
		dispatch(disableActing())
		await allOpponentsAct()
		await delay(2000)
		// Opetovne umozni moznost akce hrace
		dispatch(enableActing())
		// Vymaze karty z boardu
		dispatch(clearBoard())
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

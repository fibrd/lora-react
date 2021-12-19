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
	selectCanHeroAct,
} from '../store/slices/commonSlice'
import { delay } from '../utils'

export const Game = () => {
	const dispatch = useAppDispatch()
	const carHeroAct = useAppSelector(selectCanHeroAct)

	useEffect(() => {
		dispatch(shuffleCards())
		dispatch(setPlayerNames())
	}, [dispatch])

	async function allOpponentsAct() {
		for (const i of [0, 1, 2]) {
			await delay()
			dispatch(opponentActs(i))
		}
	}

	async function handleHeroClick(card: Card) {
		if (!carHeroAct) return

		dispatch(clearBoard())
		dispatch(removeCard({ playerIndex: 3, card }))
		dispatch(disableActing())
		await allOpponentsAct()
		await delay(1000)
		dispatch(enableActing())
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

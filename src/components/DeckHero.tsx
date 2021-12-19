import { sortBy } from 'lodash'
import React, { useMemo } from 'react'
import {
	clearBoard,
	opponentActs,
	removeCard,
	selectCards,
} from '../store/slices/cardsSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectCurrentScore } from '../store/slices/scoreSlice'
import { Card } from '../types'
import { delay } from '../utils'
import {
	disableActing,
	enableActing,
	selectCanHeroAct,
} from '../store/slices/commonSlice'

export const DeckHero = () => {
	const dispatch = useAppDispatch()
	const isSettingsSorted = true
	const carHeroAct = useAppSelector(selectCanHeroAct)
	const cards = useAppSelector(selectCards)
	const currentScore = useAppSelector(selectCurrentScore)
	const heroCards = useMemo(
		() => (isSettingsSorted ? sortBy(cards[3], ['id']) : cards[3]),
		[cards, isSettingsSorted]
	)

	async function allOpponentsAct() {
		for (const i of [0, 1, 2]) {
			await delay()
			dispatch(opponentActs(i))
		}
	}

	async function handleClick(card: Card) {
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
		<div className="hero-wrapper">
			<div className="player-name">
				<h5>playerName ({currentScore[3]})</h5>
			</div>
			<div className="card-wrapper">
				{heroCards.map(card => (
					<img
						key={card.src}
						className="card card--hero"
						src={card.src}
						alt={card.name}
						onClick={() => handleClick(card)}
					/>
				))}
			</div>
		</div>
	)
}

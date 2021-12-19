import { sortBy } from 'lodash'
import React, { useMemo } from 'react'
import { removeCard, selectCards } from '../store/slices/cardsSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectCurrentScore } from '../store/slices/scoreSlice'
import { Card } from '../types'

export const DeckHero = () => {
	const dispatch = useAppDispatch()
	const isSettingsSorted = true
	const cards = useAppSelector(selectCards)
	const currentScore = useAppSelector(selectCurrentScore)
	const heroCards = useMemo(() => {
		if (cards) {
			return isSettingsSorted ? sortBy(cards[3], ['id']) : cards[3]
		} else {
			return []
		}
	}, [cards, isSettingsSorted])

	function handleClick(card: Card) {
		dispatch(removeCard({ playerIndex: 3, card }))
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

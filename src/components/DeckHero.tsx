import { sortBy } from 'lodash'
import React, { useMemo } from 'react'
import { selectCards } from '../store/slices/cardsSlice'
import { useAppSelector } from '../store/hooks'
import { selectCurrentScore } from '../store/slices/scoreSlice'
import { Card } from '../types'

interface DeckHeroProps {
	onClick: (card: Card) => void
}

export const DeckHero = ({ onClick }: DeckHeroProps) => {
	const isSettingsSorted = true
	const cards = useAppSelector(selectCards)
	const currentScore = useAppSelector(selectCurrentScore)
	const heroCards = useMemo(
		() => (isSettingsSorted ? sortBy(cards[3], ['id']) : cards[3]),
		[cards, isSettingsSorted]
	)

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
						onClick={() => onClick(card)}
					/>
				))}
			</div>
		</div>
	)
}

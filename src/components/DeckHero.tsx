import { sortBy } from 'lodash'
import React, { useMemo } from 'react'
import { selectCards } from '../store/slices/cardsSlice'
import { useAppSelector } from '../store/hooks'
import { selectScore } from '../store/slices/scoreSlice'
import { Card } from '../types'
import { selectGame } from '../store/slices/gameSlice'
import clsx from 'clsx'

interface DeckHeroProps {
	onClick: (card: Card) => void
}

export const DeckHero = ({ onClick }: DeckHeroProps) => {
	const isSettingsSorted = true
	const { cards } = useAppSelector(selectCards)
	const { initPlayer } = useAppSelector(selectGame)
	const { currentScore } = useAppSelector(selectScore)
	const heroCards = useMemo(
		() => (isSettingsSorted ? sortBy(cards[3], ['id']) : cards[3]),
		[cards, isSettingsSorted]
	)
	const cardClassName = clsx('card', 'card--hero', {
		'card--highlighted': initPlayer === 3,
	})

	return (
		<div className="hero-wrapper">
			<div className="player-name">
				<h5>HERO ({currentScore[3]})</h5>
			</div>
			<div className="card-wrapper">
				{heroCards.map(card => (
					<img
						key={card.src}
						className={cardClassName}
						src={card.src}
						alt={card.name}
						onClick={() => onClick(card)}
					/>
				))}
			</div>
		</div>
	)
}

import { sortBy } from 'lodash'
import React, { useMemo } from 'react'
import { Card } from '../types'
import clsx from 'clsx'

interface DeckHeroProps {
	cards: Card[][]
	currentHeroScore: number
	initPlayer: number
	onClick: (card: Card) => void
}

export const DeckHero = ({
	cards,
	currentHeroScore,
	initPlayer,
	onClick,
}: DeckHeroProps) => {
	const isSettingsSorted = true
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
				<h5>HERO ({currentHeroScore})</h5>
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

import React, { useMemo } from 'react'
import clsx from 'clsx'
import { Card } from '../types'

interface DeckOpponentProps {
	cards: Card[][]
	playerNames: string[]
	opponentIndex: number
	initPlayer: number
	currentScore: Map<number, number>
}

// const CARD_BACK_SRC = '/assets/cardsmini/back.jpg'

export const DeckOpponent = ({
	cards,
	playerNames,
	opponentIndex,
	initPlayer,
	currentScore,
}: DeckOpponentProps) => {
	const opponentCards = useMemo(
		() => (cards ? cards[opponentIndex] : []),
		[cards, opponentIndex]
	)
	const cardClassName = clsx('card', 'card--opponent', {
		'card--highlighted': opponentIndex === initPlayer,
	})
	return (
		<div className="opponent-wrapper">
			<div className="player-name">
				<h5>
					{playerNames[opponentIndex]} ({currentScore.get(opponentIndex)})
				</h5>
			</div>
			<div className="deck-opponent">
				{opponentCards.map(card => (
					<img
						key={card.id}
						src={card.src}
						alt="cardBack"
						className={cardClassName}
					/>
				))}
			</div>
		</div>
	)
}

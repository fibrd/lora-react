import React, { useMemo } from 'react'
import { selectCards } from '../store/slices/cardsSlice'
import { useAppSelector } from '../store/hooks'
import clsx from 'clsx'

interface DeckOpponentProps {
	playerNames: string[]
	opponentIndex: number
	initPlayer: number
	currentScore: Map<number, number>
}

// const CARD_BACK_SRC = '/assets/cardsmini/back.jpg'

export const DeckOpponent = ({
	playerNames,
	opponentIndex,
	initPlayer,
	currentScore,
}: DeckOpponentProps) => {
	const { cards } = useAppSelector(selectCards)
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

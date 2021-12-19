import React, { useMemo } from 'react'
import { selectCards } from '../store/slices/cardsSlice'
import { useAppSelector } from '../store/hooks'
import { selectCurrentScore } from '../store/slices/scoreSlice'
import clsx from 'clsx'
import { selectPlayerNames } from '../store/slices/nameSlice'

interface DeckOpponentProps {
	opponentIndex: number
}

// const CARD_BACK_SRC = '/assets/cardsmini/back.jpg'

export const DeckOpponent = ({ opponentIndex }: DeckOpponentProps) => {
	const cards = useAppSelector(selectCards)
	const playerNames = useAppSelector(selectPlayerNames)
	const currentScore = useAppSelector(selectCurrentScore)
	const opponentCards = useMemo(
		() => (cards ? cards[opponentIndex] : []),
		[cards, opponentIndex]
	)
	const cardClassName = clsx('card', 'card--opponent', {
		'card--highlighted': opponentIndex === 1,
	})
	return (
		<div className="opponent-wrapper">
			<div className="player-name">
				<h5>
					{playerNames[opponentIndex]} ({currentScore[opponentIndex]})
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

import React, { useMemo } from 'react'
import { selectCards } from '../store/slices/cardsSlice'
import { useAppSelector } from '../store/hooks'
import { selectCurrentScore } from '../store/slices/scoreSlice'

interface DeckOpponentProps {
	opponentIndex: number
}

const CARD_BACK_SRC = '/assets/cardsmini/back.jpg'

export const DeckOpponent = ({ opponentIndex }: DeckOpponentProps) => {
	const cards = useAppSelector(selectCards)
	const currentScore = useAppSelector(selectCurrentScore)
	const opponentCards = useMemo(
		() => (cards ? cards[opponentIndex] : []),
		[cards, opponentIndex]
	)
	return (
		<div className="opponent-wrapper">
			<div className="player-name">
				<h5>
					villainsNames[{opponentIndex}] ({currentScore[opponentIndex]})
				</h5>
			</div>
			<div className="deck-opponent">
				{opponentCards.map(card => (
					<img
						key={card.id}
						src={CARD_BACK_SRC}
						alt="cardBack"
						className="card card--opponent"
					/>
				))}
			</div>
		</div>
	)
}

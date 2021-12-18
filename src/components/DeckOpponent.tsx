import React from 'react'
import { selectCards } from '../store/cardsSlice'
import { useAppSelector } from '../store/hooks'

interface DeckOpponentProps {
	opponentIndex: number
}

const CARD_BACK_SRC = '/assets/cardsmini/back.jpg'

export const DeckOpponent = ({ opponentIndex }: DeckOpponentProps) => {
	const cards = useAppSelector(selectCards)
	return (
		<div className="card-wrapper">
			<div className="player-name">
				<h5>
					villainsNames[{opponentIndex}] (currentScore[{opponentIndex}])
				</h5>
			</div>
			{cards?.[opponentIndex].map(card => (
				<img
					key={card.id}
					src={CARD_BACK_SRC}
					alt="cardBack"
					className="card"
				/>
			))}
		</div>
	)
}

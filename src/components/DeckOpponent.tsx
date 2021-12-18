import React from 'react'
import { Card } from '../types'

interface DeckOpponentProps {
	cards: Card[]
}

const CARD_BACK_SRC = '/assets/cardsmini/back.jpg'

export const DeckOpponent = ({ cards }: DeckOpponentProps) => {
	return (
		<div className="card-wrapper">
			<div className="player-name">
				<h5>villainsNames[villain] (currentScore[villain])</h5>
			</div>
			{cards.map(card => (
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

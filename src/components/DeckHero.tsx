import React from 'react'
import { Card } from '../types'

interface DeckHeroProps {
	cards: Card[]
}

export const DeckHero = ({ cards }: DeckHeroProps) => {
	return (
		<div className="hero-wrapper">
			<div className="player-name">
				<h5>playerName (heroScore)</h5>
			</div>
			<div className="card-wrapper">
				{cards.map(card => (
					<img key={card.src} className="card" src={card.src} alt={card.name} />
				))}
			</div>
		</div>
	)
}

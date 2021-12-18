import React from 'react'
import { selectCards } from '../store/cardsSlice'
import { useAppSelector } from '../store/hooks'

export const DeckHero = () => {
	const cards = useAppSelector(selectCards)
	return (
		<div className="hero-wrapper">
			<div className="player-name">
				<h5>playerName (heroScore)</h5>
			</div>
			<div className="card-wrapper">
				{cards?.[3].map(card => (
					<img key={card.src} className="card" src={card.src} alt={card.name} />
				))}
			</div>
		</div>
	)
}

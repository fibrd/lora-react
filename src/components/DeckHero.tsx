import { sortBy } from 'lodash'
import React, { useMemo } from 'react'
import { removeCard, selectCards } from '../store/cardsSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'

export const DeckHero = () => {
	const dispatch = useAppDispatch()
	const isSettingsSorted = true
	const cards = useAppSelector(selectCards)
	const heroCards = useMemo(() => {
		if (cards) {
			return isSettingsSorted ? sortBy(cards[3], ['id']) : cards[3]
		} else {
			return []
		}
	}, [cards, isSettingsSorted])

	function handleClick(cardId: number) {
		dispatch(removeCard({ playerIndex: 3, cardId }))
	}

	return (
		<div className="hero-wrapper">
			<div className="player-name">
				<h5>playerName (heroScore)</h5>
			</div>
			<div className="card-wrapper">
				{heroCards.map(card => (
					<img
						key={card.src}
						className="card"
						src={card.src}
						alt={card.name}
						onClick={() => handleClick(card.id)}
					/>
				))}
			</div>
		</div>
	)
}

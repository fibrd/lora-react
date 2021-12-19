import React, { useEffect } from 'react'
import { DeckHero } from '../components/DeckHero'
import { shuffleCards } from '../store/slices/cardsSlice'
import { useAppDispatch } from '../store/hooks'
import { DeckOpponent } from '../components/DeckOpponent'

export const Game = () => {
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(shuffleCards())
	}, [dispatch])
	return (
		<div className="game-area">
			<div className="opponents-wrapper">
				{[0, 1, 2].map(index => (
					<DeckOpponent key={index} opponentIndex={index} />
				))}
			</div>
			<DeckHero />
		</div>
	)
}
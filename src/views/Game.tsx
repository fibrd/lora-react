import React, { useEffect } from 'react'
import { DeckHero } from '../components/DeckHero'
import { shuffleCards } from '../store/slices/cardsSlice'
import { useAppDispatch } from '../store/hooks'
import { DeckOpponent } from '../components/DeckOpponent'
import { Board } from '../components/Board'
import { setPlayerNames } from '../store/slices/nameSlice'

export const Game = () => {
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(shuffleCards())
		dispatch(setPlayerNames())
	}, [dispatch])
	return (
		<div className="game-area">
			<div className="opponents-wrapper">
				{[0, 1, 2].map(index => (
					<DeckOpponent key={index} opponentIndex={index} />
				))}
			</div>
			<Board />
			<DeckHero />
		</div>
	)
}

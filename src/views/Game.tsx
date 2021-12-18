import React, { useEffect } from 'react'
import { DeckHero } from '../components/DeckHero'
import { shuffleCards } from '../store/cardsSlice'
import { useAppDispatch } from '../store/hooks'
import { DeckOpponent } from '../components/DeckOpponent'

interface GameProps {
	title: string
}

export const Game = ({ title }: GameProps) => {
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(shuffleCards())
	}, [dispatch])
	return (
		<div>
			<h1>{title}</h1>
			{[0, 1, 2].map(index => (
				<DeckOpponent key={index} opponentIndex={index} />
			))}
			<DeckHero />
		</div>
	)
}

import React, { useMemo } from 'react'
import { DeckHero } from '../components/DeckHero'
import { selectCards } from '../store/cardsSlice'
import { useAppSelector } from '../store/hooks'
import { chunk, shuffle } from 'lodash'
import { DeckOpponent } from '../components/DeckOpponent'

interface GameProps {
	title: string
}

export const Game = ({ title }: GameProps) => {
	const cards = useAppSelector(selectCards)
	const shuffledCards = useMemo(() => shuffle(cards), [cards])
	const chunkedCards = useMemo(() => chunk(shuffledCards, 8), [shuffledCards])
	return (
		<div>
			<h1>{title}</h1>
			{[0, 1, 2].map(index => (
				<DeckOpponent key={index} cards={chunkedCards[index]} />
			))}
			<DeckHero cards={chunkedCards[3]} />
		</div>
	)
}

import React, { useMemo } from 'react'
import { selectCards } from '../store/slices/cardsSlice'
import { useAppSelector } from '../store/hooks'
import { selectScore } from '../store/slices/scoreSlice'
import clsx from 'clsx'
import { selectGame } from '../store/slices/gameSlice'

interface DeckOpponentProps {
	playerNames: string[]
	opponentIndex: number
}

// const CARD_BACK_SRC = '/assets/cardsmini/back.jpg'

export const DeckOpponent = ({
	playerNames,
	opponentIndex,
}: DeckOpponentProps) => {
	const { cards } = useAppSelector(selectCards)
	const { currentScore } = useAppSelector(selectScore)
	const { initPlayer } = useAppSelector(selectGame)
	const opponentCards = useMemo(
		() => (cards ? cards[opponentIndex] : []),
		[cards, opponentIndex]
	)
	const cardClassName = clsx('card', 'card--opponent', {
		'card--highlighted': opponentIndex === initPlayer,
	})
	return (
		<div className="opponent-wrapper">
			<div className="player-name">
				<h5>
					{playerNames[opponentIndex]} ({currentScore[opponentIndex]})
				</h5>
			</div>
			<div className="deck-opponent">
				{opponentCards.map(card => (
					<img
						key={card.id}
						src={card.src}
						alt="cardBack"
						className={cardClassName}
					/>
				))}
			</div>
		</div>
	)
}

import clsx from 'clsx'
import React from 'react'
import { Card } from '../types'

interface BoardCardProps {
	boardCards: Card[]
	playerIndex: number
	currentLoser: number | null
}

const CARD_BLANK_SRC = '/assets/cardsmini/blank.jpg'

export const BoardCard = ({
	boardCards,
	playerIndex,
	currentLoser,
}: BoardCardProps) => {
	const boardCardSrc = boardCards[playerIndex]?.src || CARD_BLANK_SRC
	const boardCardClassName = clsx('card', 'card--board', {
		'card--blank': boardCardSrc === CARD_BLANK_SRC,
		'card--highlighted-red': playerIndex === currentLoser,
	})
	return (
		<div className="board-card-wrapper">
			<img
				key={`boardCard-${playerIndex}`}
				src={boardCardSrc}
				className={boardCardClassName}
				alt="board-card"
			/>
		</div>
	)
}

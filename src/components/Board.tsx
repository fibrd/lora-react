import React from 'react'
import { Card } from '../types'
import { BoardCard } from './BoardCard'

interface BoardProps {
	boardCards: Card[]
	currentLoser: number | null
}

export const Board = ({ boardCards, currentLoser }: BoardProps) => {
	return (
		<div className="board-wrapper">
			<BoardCard
				playerIndex={0}
				currentLoser={currentLoser}
				boardCards={boardCards}
			/>
			<div>
				<BoardCard
					playerIndex={1}
					currentLoser={currentLoser}
					boardCards={boardCards}
				/>
				<BoardCard
					playerIndex={3}
					currentLoser={currentLoser}
					boardCards={boardCards}
				/>
			</div>
			<BoardCard
				playerIndex={2}
				currentLoser={currentLoser}
				boardCards={boardCards}
			/>
		</div>
	)
}

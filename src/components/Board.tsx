import React from 'react'
import { BoardCard } from './BoardCard'

interface BoardProps {
	currentLoser: number | null
}

export const Board = ({ currentLoser }: BoardProps) => {
	return (
		<div className="board-wrapper">
			<BoardCard playerIndex={0} currentLoser={currentLoser} />
			<div>
				<BoardCard playerIndex={1} currentLoser={currentLoser} />
				<BoardCard playerIndex={3} currentLoser={currentLoser} />
			</div>
			<BoardCard playerIndex={2} currentLoser={currentLoser} />
		</div>
	)
}

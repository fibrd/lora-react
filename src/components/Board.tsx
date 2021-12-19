import React from 'react'
import { BoardCard } from './BoardCard'

export const Board = () => {
	return (
		<div className="board-wrapper">
			<BoardCard playerIndex={0} />
			<div>
				<BoardCard playerIndex={1} />
				<BoardCard playerIndex={3} />
			</div>
			<BoardCard playerIndex={2} />
		</div>
	)
}

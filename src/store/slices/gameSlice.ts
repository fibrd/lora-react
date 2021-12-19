import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface GameState {
	mode: number
	round: number
}

const initialState: GameState = {
	mode: 0,
	round: 0,
}

export const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		increaseMode: state => {
			state.mode += 1
		},
		increaseRound: state => {
			state.round += 1
		},
	},
})

export const { increaseMode, increaseRound } = gameSlice.actions

export const selectGame = (state: RootState) => state.game

export default gameSlice.reducer

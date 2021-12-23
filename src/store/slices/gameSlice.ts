import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface GameState {
	mode: number
	round: number
	initPlayer: number
}

const initialState: GameState = {
	mode: 0,
	round: 0,
	initPlayer: 0,
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
		setInitPlayer: (state, action: PayloadAction<{ playerIndex: number }>) => {
			state.initPlayer = action.payload.playerIndex
		},
	},
})

export const { increaseMode, increaseRound, setInitPlayer } = gameSlice.actions

export const selectGame = (state: RootState) => state.game

export default gameSlice.reducer

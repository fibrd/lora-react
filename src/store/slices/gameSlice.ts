import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCurrentLoser } from '../../gameplay'
import { AppThunk, RootState } from '../store'

export interface GameState {
	mode: number
	round: number
	initPlayer: number
	currentLoser: number
}

const initialState: GameState = {
	mode: 0,
	round: 0,
	initPlayer: 3,
	currentLoser: -1,
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
		setCurrentLoser: (
			state,
			action: PayloadAction<{ playerIndex: number }>
		) => {
			state.currentLoser = action.payload.playerIndex
		},
	},
})

export const { increaseMode, increaseRound, setInitPlayer, setCurrentLoser } =
	gameSlice.actions

export const selectGame = (state: RootState) => state.game

export const getLoserIndex = (): AppThunk => (dispatch, getState) => {
	const loserIndex = getCurrentLoser(getState())
	return loserIndex
}

export default gameSlice.reducer

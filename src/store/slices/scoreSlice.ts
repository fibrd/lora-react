import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface ScoreState {
	totalScore: number[]
	currentScore: number[]
}

const initialState: ScoreState = {
	totalScore: [0, 0, 0, 0],
	currentScore: [0, 0, 0, 0],
}

export const scoreSlice = createSlice({
	name: 'score',
	initialState,
	reducers: {
		incrementTotalScore: (
			state,
			action: PayloadAction<{ playerIndex: number }>
		) => {
			state.totalScore[action.payload.playerIndex] += 1
		},
		incrementTotalScoreByAmount: (
			state,
			action: PayloadAction<{ playerIndex: number; amount: number }>
		) => {
			state.totalScore[action.payload.playerIndex] += action.payload.amount
		},
		incrementCurrentScore: (
			state,
			action: PayloadAction<{ playerIndex: number }>
		) => {
			state.currentScore[action.payload.playerIndex] += 1
		},
		incrementCurrentScoreByAmount: (
			state,
			action: PayloadAction<{ playerIndex: number; amount: number }>
		) => {
			state.currentScore[action.payload.playerIndex] += action.payload.amount
		},
	},
})

export const { incrementTotalScore, incrementTotalScoreByAmount } =
	scoreSlice.actions

export const selectTotalScore = (state: RootState) => state.score.totalScore
export const selectCurrentScore = (state: RootState) => state.score.currentScore

export default scoreSlice.reducer

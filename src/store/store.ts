import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import cardsReducer from './slices/cardsSlice'
import scoreReducer from './slices/scoreSlice'
import gameReducer from './slices/gameSlice'

export const store = configureStore({
	reducer: {
		cards: cardsReducer,
		score: scoreReducer,
		game: gameReducer,
	},
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void | number> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>

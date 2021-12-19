import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import cardsReducer from './slices/cardsSlice'
import scoreReducer from './slices/scoreSlice'
import commonReducer from './slices/commonSlice'
import nameReducer from './slices/nameSlice'

export const store = configureStore({
	reducer: {
		cards: cardsReducer,
		score: scoreReducer,
		common: commonReducer,
		name: nameReducer,
	},
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>

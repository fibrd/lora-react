import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { chunk, shuffle } from 'lodash'
import { Card } from '../types'
import { getCards } from '../utils'
import { RootState } from './store'

export interface CardsState {
	cards: Card[][] | null
}

const initialState: CardsState = {
	cards: null,
}

export const cardsSlice = createSlice({
	name: 'cards',
	initialState,
	reducers: {
		shuffleCards: state => {
			const shuffledCards = shuffle(getCards())
			state.cards = chunk(shuffledCards, 8)
		},
		removeCard: (
			state,
			action: PayloadAction<{ playerIndex: number; cardId: number }>
		) => {
			if (state.cards) {
				const playerIndex = action.payload.playerIndex
				state.cards[playerIndex] = state.cards[playerIndex].filter(
					card => card.id !== action.payload.cardId
				)
			}
		},
	},
})

export const { shuffleCards, removeCard } = cardsSlice.actions

export const selectCards = (state: RootState) => state.cards.cards

export default cardsSlice.reducer

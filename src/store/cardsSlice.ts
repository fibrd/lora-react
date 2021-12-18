import { createSlice } from '@reduxjs/toolkit'
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
	},
})

export const { shuffleCards } = cardsSlice.actions

export const selectCards = (state: RootState) => state.cards.cards

export default cardsSlice.reducer

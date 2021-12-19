import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { chunk, shuffle } from 'lodash'
import { Card } from '../../types'
import { getCards } from '../../utils'
import { RootState } from '../store'

export interface CardsState {
	cards: Card[][] | null
	boardCards: Card[]
}

const initialState: CardsState = {
	cards: null,
	boardCards: [getCards()[10], getCards()[25], getCards()[13], getCards()[7]],
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
			action: PayloadAction<{ playerIndex: number; card: Card }>
		) => {
			const { playerIndex, card } = action.payload
			if (state.cards) {
				state.cards[playerIndex] = state.cards[playerIndex].filter(
					c => c.id !== card.id
				)
				state.boardCards[playerIndex] = card
			}
		},
	},
})

export const { shuffleCards, removeCard } = cardsSlice.actions

export const selectCards = (state: RootState) => state.cards.cards
export const selectBoardCards = (state: RootState) => state.cards.boardCards

export default cardsSlice.reducer

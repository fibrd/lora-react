import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { chunk, shuffle } from 'lodash'
import { chooseCard } from '../../gameplay'
import { Card } from '../../types'
import { getCards } from '../../utils'
import { AppThunk, RootState } from '../store'

export interface CardsState {
	cards: Card[][]
	cardsOut: Card[]
	boardCards: Card[]
}

const initialState: CardsState = {
	cards: [[], [], [], []],
	cardsOut: [],
	boardCards: [],
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
			state.cards[playerIndex] = state.cards[playerIndex].filter(
				c => c.id !== card.id
			)
			state.boardCards[playerIndex] = card
		},
		clearBoard: state => {
			state.cardsOut.push(...state.boardCards)
			state.boardCards = []
		},
	},
})

export const { shuffleCards, removeCard, clearBoard } = cardsSlice.actions

export const selectCards = (state: RootState) => state.cards

export const opponentActs =
	(playerIndex: number): AppThunk =>
	(dispatch, getState) => {
		const card = chooseCard(playerIndex, getState())

		dispatch(removeCard({ playerIndex, card }))
	}

export default cardsSlice.reducer

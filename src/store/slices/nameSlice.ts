import { createSlice } from '@reduxjs/toolkit'
import { getRandomNames } from '../../utils'
import { RootState } from '../store'

export interface NameState {
	playerNames: string[]
}

const initialState: NameState = {
	playerNames: [],
}

export const nameSlice = createSlice({
	name: 'name',
	initialState,
	reducers: {
		setPlayerNames: state => {
			state.playerNames = getRandomNames()
		},
	},
})

export const { setPlayerNames } = nameSlice.actions

export const selectName = (state: RootState) => state.name

export default nameSlice.reducer

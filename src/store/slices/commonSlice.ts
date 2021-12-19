import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface CommonState {
	canHeroAct: boolean
}

const initialState: CommonState = {
	canHeroAct: true,
}

export const commonSlice = createSlice({
	name: 'common',
	initialState,
	reducers: {
		disableActing: state => {
			state.canHeroAct = false
		},
		enableActing: state => {
			state.canHeroAct = true
		},
	},
})

export const { disableActing, enableActing } = commonSlice.actions

export const selectCommon = (state: RootState) => state.common

export default commonSlice.reducer

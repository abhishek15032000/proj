import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setLocalItem } from '../../utils/Storage'
import { TYPES } from '../constants'

interface AuthReducerInterface {
    loggedIn: boolean
    data: any
}
const initialState: AuthReducerInterface = {
    loggedIn: false,
    data: null,
}
const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginAction: (state, action: PayloadAction<any>) => {
            state.loggedIn = true
            state.data = action.payload
            setLocalItem("loggedIn", action.payload)
        },
    },
})

export const { loginAction } = auth.actions

export default auth.reducer

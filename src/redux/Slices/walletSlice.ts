import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface WalletReducerInterface {
    loadWallet: boolean
}
const initialState: WalletReducerInterface = {
    loadWallet: false,
}
const wallet = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        setLoadWallet: (state, action: PayloadAction<any>) => {
            state.loadWallet = action.payload
        },
    },
})

export const { setLoadWallet } = wallet.actions

export default wallet.reducer

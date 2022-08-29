import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface WalletReducerInterface {
    loadWallet: boolean
    haveMetamask: boolean
    isConnected: boolean
    accountAddress: string
    accountBalance: string
    guideOpen: boolean
}
const initialState: WalletReducerInterface = {
    loadWallet: false,
    haveMetamask: false,
    isConnected: false,
    accountAddress: "",
    accountBalance: "",
    guideOpen: false

}
const wallet = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        setLoadWallet: (state, action: PayloadAction<any>) => {

            state.loadWallet = action.payload
        },
        setMetamask: (state, action: PayloadAction<any>) => {
            state.haveMetamask = action.payload
        },

        setConnected: (state, action: PayloadAction<any>) => {
            state.isConnected = action.payload
        },
        setAccountAddress: (state, action: PayloadAction<any>) => {
            state.accountAddress = action.payload
        },
        setAccountBalance: (state, action: PayloadAction<any>) => {
            state.accountBalance = action.payload
        },
        setGuide: (state, action: PayloadAction<any>) => {
            state.guideOpen = action.payload
        }
    },
})

export const { setLoadWallet, setMetamask,
    setConnected,
    setAccountAddress,
    setAccountBalance,
    setGuide } = wallet.actions

export default wallet.reducer

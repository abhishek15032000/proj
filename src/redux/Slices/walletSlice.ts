import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface WalletReducerInterface {
    loadWallet: boolean
    haveMetamask: boolean
    isConnected: boolean
    accountAddress: string
    accountBalance: string
    alertMessage: string
    walletNetwork: any
    guideOpen: boolean
    loadWalletAlert: boolean
}
const initialState: WalletReducerInterface = {
    loadWallet: false,
    haveMetamask: false,
    isConnected: false,
    accountAddress: "",
    accountBalance: "",
    guideOpen: false,
    loadWalletAlert: false,
    walletNetwork: "",
    alertMessage: "",

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
        setAlertMessage: (state, action: PayloadAction<any>) => {
            state.alertMessage = action.payload
        },
        setWalletNetwork: (state, action: PayloadAction<any>) => {
            state.walletNetwork = action.payload
        },
        setGuide: (state, action: PayloadAction<any>) => {
            state.guideOpen = action.payload
        },
        setLoadWalletAlert: (state, action: PayloadAction<any>) => {
            state.loadWalletAlert = action.payload
        },
        resetWallet: (state) => {
            state = initialState
        }
    },
})

export const { setLoadWallet, setMetamask,
    setConnected,
    setAccountAddress,
    setAccountBalance,
    setWalletNetwork,
    setAlertMessage,
    setLoadWalletAlert,
    resetWallet,
    setGuide } = wallet.actions

export default wallet.reducer

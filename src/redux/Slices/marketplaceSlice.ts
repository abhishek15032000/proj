import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MarketplaceReducerInterface {
  buyQuantityForApprove: number
  buyQuantityForDeposit: number
  buyQuantityForBuyOrder: number
  buyUnitPrice: number
  totalAmountForBuying: number
  buyOrderPayloadOfferHashes: any
  buyOrderPayloadAmountsToTake: any
  buyOrderPayloadUUID: any
  sellQuantityForApprove: number
  sellQuantityForDeposit: number
  sellQuantityForSellOrder: number
  sellUnitPriceForSellOrder: number
  onGoingApproveRedux: any
  onGoingApproveReduxBuyFlow: any
  onGoingDepositTxIdReduxSellFlow: any
  onGoingDepositTxIdReduxBuyFlow: any
  onGoingSellOrderTxIdRedux: any
  onGoingBuyOrderTxIdRedux: any
  dataToMakeBuyCall: any
  dataToMakeDepositCall: any
  dataToMakeDepositCallBuyFlow: any
  dataToMakeCreateSellOrderCall: any
  dataToMakeCreateBuyOrderCall: any
  walletBal: any
  exchangeBal: any
  approvedTokensBal: any
  walletBalBuyFlow: any
  exchangeBalBuyFlow: any
  approvedTokensBalBuyFlow: any
  setIntervalId: any
  intervalTime: number
  ongoingApproveTransactionSellFlow: any
  ongoingDepositTransactionSellFlow: any
  ongoingSellOrderTransaction: any
  ongoingApproveTransactionBuyFlow: any
  ongoingDepositTransactionBuyFlow: any
  ongoingBuyOrderTransaction: any
  ongoingTransaction: any
}
const initialState: MarketplaceReducerInterface = {
  buyQuantityForApprove: 0,
  buyQuantityForDeposit: 0,
  buyQuantityForBuyOrder: 0,
  buyUnitPrice: 0,
  totalAmountForBuying: 0,
  buyOrderPayloadOfferHashes: null,
  buyOrderPayloadAmountsToTake: null,
  buyOrderPayloadUUID: null,
  sellQuantityForApprove: 0,
  sellQuantityForDeposit: 0,
  sellQuantityForSellOrder: 0,
  sellUnitPriceForSellOrder: 0,
  onGoingApproveRedux: null,
  onGoingApproveReduxBuyFlow: null,
  onGoingDepositTxIdReduxSellFlow: null,
  onGoingDepositTxIdReduxBuyFlow: null,
  onGoingSellOrderTxIdRedux: null,
  onGoingBuyOrderTxIdRedux: null,
  dataToMakeBuyCall: null,
  dataToMakeDepositCall: null,
  dataToMakeDepositCallBuyFlow: null,
  dataToMakeCreateSellOrderCall: null,
  dataToMakeCreateBuyOrderCall: null,
  walletBal: null,
  exchangeBal: null,
  approvedTokensBal: null,
  walletBalBuyFlow: null,
  exchangeBalBuyFlow: null,
  approvedTokensBalBuyFlow: null,
  setIntervalId: null,
  intervalTime: 4,
  ongoingApproveTransactionSellFlow: null,
  ongoingDepositTransactionSellFlow: null,
  ongoingSellOrderTransaction: null,
  ongoingApproveTransactionBuyFlow: null,
  ongoingDepositTransactionBuyFlow: null,
  ongoingBuyOrderTransaction: null,
  ongoingTransaction: null,
}
const marketplace = createSlice({
  name: 'marketplace',
  initialState,
  reducers: {
    setBuyQuantityForApprove: (state, action: PayloadAction<any>) => {
      state.buyQuantityForApprove = action.payload
    },
    setBuyQuantityForDeposit: (state, action: PayloadAction<any>) => {
      state.buyQuantityForDeposit = action.payload
    },
    setBuyQuantityForBuyOrder: (state, action: PayloadAction<any>) => {
      state.buyQuantityForBuyOrder = action.payload
    },
    setBuyUnitPrice: (state, action: PayloadAction<any>) => {
      state.buyUnitPrice = action.payload
    },
    setTotalAmountForBuying: (state, action: PayloadAction<any>) => {
      state.totalAmountForBuying = action.payload
    },
    setBuyOrderPayloadOfferHashes: (state, action: PayloadAction<any>) => {
      state.buyOrderPayloadOfferHashes = action.payload
    },
    setBuyOrderPayloadAmountsToTake: (state, action: PayloadAction<any>) => {
      state.buyOrderPayloadAmountsToTake = action.payload
    },
    setBuyOrderPayloadUUID: (state, action: PayloadAction<any>) => {
      state.buyOrderPayloadUUID = action.payload
    },
    setSellQuantityForApprove: (state, action: PayloadAction<any>) => {
      state.sellQuantityForApprove = action.payload
    },
    setSellQuantityForDeposit: (state, action: PayloadAction<any>) => {
      state.sellQuantityForDeposit = action.payload
    },
    setSellQuantityForSellOrder: (state, action: PayloadAction<any>) => {
      state.sellQuantityForSellOrder = action.payload
    },
    setSellUnitPriceForSellOrder: (state, action: PayloadAction<any>) => {
      state.sellUnitPriceForSellOrder = action.payload
    },
    setOnGoingApproveRedux: (state, action: PayloadAction<any>) => {
      state.onGoingApproveRedux = action.payload
    },
    setOnGoingApproveReduxBuyFlow: (state, action: PayloadAction<any>) => {
      state.onGoingApproveReduxBuyFlow = action.payload
    },
    setOnGoingDepositTxIdReduxSellFlow: (state, action: PayloadAction<any>) => {
      state.onGoingDepositTxIdReduxSellFlow = action.payload
    },
    setOnGoingDepositTxIdReduxBuyFlow: (state, action: PayloadAction<any>) => {
      state.onGoingDepositTxIdReduxBuyFlow = action.payload
    },
    setOnGoingSellOrderTxIdRedux: (state, action: PayloadAction<any>) => {
      state.onGoingSellOrderTxIdRedux = action.payload
    },
    setOnGoingBuyOrderTxIdRedux: (state, action: PayloadAction<any>) => {
      state.onGoingBuyOrderTxIdRedux = action.payload
    },
    setDataToMakeDepositCall: (state, action: PayloadAction<any>) => {
      state.dataToMakeDepositCall = action.payload
    },
    setDataToMakeDepositCallBuyFlow: (state, action: PayloadAction<any>) => {
      state.dataToMakeDepositCallBuyFlow = action.payload
    },
    setDataToMakeCreateSellOrderCall: (state, action: PayloadAction<any>) => {
      state.dataToMakeCreateSellOrderCall = action.payload
    },
    setDataToMakeCreateBuyOrderCall: (state, action: PayloadAction<any>) => {
      state.dataToMakeCreateBuyOrderCall = action.payload
    },
    setWalletBal: (state, action: PayloadAction<any>) => {
      state.walletBal = action.payload
    },
    setExchangeBal: (state, action: PayloadAction<any>) => {
      state.exchangeBal = action.payload
    },
    setApprovedTokensBal: (state, action: PayloadAction<any>) => {
      state.approvedTokensBal = action.payload
    },
    setWalletBalBuyFlow: (state, action: PayloadAction<any>) => {
      state.walletBalBuyFlow = action.payload
    },
    setExchangeBalBuyFlow: (state, action: PayloadAction<any>) => {
      state.exchangeBalBuyFlow = action.payload
    },
    setApprovedTokensBalBuyFlow: (state, action: PayloadAction<any>) => {
      state.approvedTokensBalBuyFlow = action.payload
    },
    setSetIntervalId: (state, action: PayloadAction<any>) => {
      state.setIntervalId = action.payload
    },
    setIntervalTime: (state, action: PayloadAction<any>) => {
      state.intervalTime = action.payload
    },
    setOngoingApproveTransactionSellFlow: (
      state,
      action: PayloadAction<any>
    ) => {
      state.ongoingApproveTransactionSellFlow = action.payload
    },
    setOngoingDepositTransactionSellFlow: (
      state,
      action: PayloadAction<any>
    ) => {
      state.ongoingDepositTransactionSellFlow = action.payload
    },
    setOngoingSellOrderTransaction: (state, action: PayloadAction<any>) => {
      state.ongoingSellOrderTransaction = action.payload
    },
    setOngoingApproveTransactionBuyFlow: (
      state,
      action: PayloadAction<any>
    ) => {
      state.ongoingApproveTransactionBuyFlow = action.payload
    },
    setOngoingDepositTransactionBuyFlow: (
      state,
      action: PayloadAction<any>
    ) => {
      state.ongoingDepositTransactionBuyFlow = action.payload
    },
    setOngoingBuyOrderTransaction: (state, action: PayloadAction<any>) => {
      state.ongoingBuyOrderTransaction = action.payload
    },
    setOngoingTransaction: (state, action: PayloadAction<any>) => {
      state.ongoingTransaction = action.payload
    },
  },
})

export const {
  setBuyQuantityForApprove,
  setBuyQuantityForDeposit,
  setBuyQuantityForBuyOrder,
  setBuyUnitPrice,
  setTotalAmountForBuying,
  setBuyOrderPayloadOfferHashes,
  setBuyOrderPayloadAmountsToTake,
  setBuyOrderPayloadUUID,
  setSellQuantityForApprove,
  setSellQuantityForDeposit,
  setSellQuantityForSellOrder,
  setSellUnitPriceForSellOrder,
  setOnGoingApproveRedux,
  setOnGoingApproveReduxBuyFlow,
  setOnGoingDepositTxIdReduxSellFlow,
  setOnGoingDepositTxIdReduxBuyFlow,
  setOnGoingSellOrderTxIdRedux,
  setOnGoingBuyOrderTxIdRedux,
  setDataToMakeDepositCall,
  setDataToMakeDepositCallBuyFlow,
  setWalletBal,
  setExchangeBal,
  setApprovedTokensBal,
  setWalletBalBuyFlow,
  setExchangeBalBuyFlow,
  setApprovedTokensBalBuyFlow,
  setDataToMakeCreateSellOrderCall,
  setDataToMakeCreateBuyOrderCall,
  setOngoingApproveTransactionSellFlow,
  setOngoingDepositTransactionSellFlow,
  setOngoingSellOrderTransaction,
  setOngoingApproveTransactionBuyFlow,
  setOngoingDepositTransactionBuyFlow,
  setOngoingBuyOrderTransaction,
  setOngoingTransaction,
} = marketplace.actions

export default marketplace.reducer

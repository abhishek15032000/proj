import { ethers } from 'ethers'
import Web3 from 'web3'
import { marketplaceCalls } from '../api/marketplaceCalls.api'
import BlockchainCalls from '../blockchain/Blockchain'
import { EXCHANGE_CONTRACT_ADDRESS } from '../config/exchange.config'
import {
  LOCAL_STORAGE_VARS,
  MARKETPLACE_CALL_TYPES,
} from '../config/constants.config'
import {
  INR_USD_TOKEN_ADDRESS,
  TOKEN_CONTRACT_ADDRESS,
} from '../config/token.config'
import {
  setApprovedTokensBal,
  setApprovedTokensBalBuyFlow,
  setBuyOrderPayloadAmountsToTake,
  setBuyOrderPayloadOfferHashes,
  setBuyOrderPayloadUUID,
  setBuyQuantityForApprove,
  setBuyQuantityForBuyOrder,
  setBuyQuantityForDeposit,
  setExchangeBal,
  setExchangeBalBuyFlow,
  setMarketplaceLoading,
  setMarketplaceModalMessage,
  setOnGoingApproveRedux,
  setOnGoingApproveReduxBuyFlow,
  setOngoingBuyOrderTransaction,
  setOnGoingBuyOrderTxIdRedux,
  setOngoingDepositTransactionBuyFlow,
  setOngoingDepositTransactionSellFlow,
  setOnGoingDepositTxIdReduxBuyFlow,
  setOnGoingDepositTxIdReduxSellFlow,
  setOngoingSellOrderTransaction,
  setOngoingWithdrawOrderTransaction,
  setSellQuantityForApprove,
  setSellQuantityForDeposit,
  setSellQuantityForSellOrder,
  setSellUnitPriceForSellOrder,
  setShowMarketplaceMsgModal,
  setWalletBal,
  setWalletBalBuyFlow,
  setWithdrawQuantity,
} from '../redux/Slices/marketplaceSlice'
import { store } from '../redux/store'
import { getLocalItem, setLocalItem } from './Storage'
import { transactionCalls } from '../api/transactionCalls.api'

declare let window: any

const provider =
  window.ethereum != null
    ? new ethers.providers.Web3Provider(window.ethereum)
    : ethers.getDefaultProvider()

export async function getWalletBalance() {
  const accountAddress = store.getState()?.wallet?.accountAddress
  if (accountAddress) {
    try {
      const tokenContractFunctions = await BlockchainCalls.token_caller()
      const balanceCallRes = await tokenContractFunctions.balanceOf(
        accountAddress
      )
      if (balanceCallRes) {
        const bal =
          Math.round(Number(balanceCallRes.toString()) * 10 ** -18 * 1000) /
          1000
        store.dispatch(setWalletBal(bal))
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export async function getBalanceOnExchange() {
  const accountAddress = store.getState()?.wallet?.accountAddress
  if (accountAddress) {
    try {
      const exchangeContractFunctions = await BlockchainCalls.exchange_caller()
      const exchangeBal = await exchangeContractFunctions.balances(
        accountAddress,
        TOKEN_CONTRACT_ADDRESS
      )
      const bigNumExchangeBal = ethers.BigNumber.from(exchangeBal)
      store.dispatch(setExchangeBal(bigNumExchangeBal.toNumber()))
    } catch (err) {
      console.log(err)
    }
  }
}

export async function getApprovedTokensBalance() {
  const accountAddress = store.getState()?.wallet?.accountAddress
  if (accountAddress) {
    try {
      const tokenContractFunctions = await BlockchainCalls.token_caller()
      const approvedTokensBalRes = await tokenContractFunctions.allowance(
        accountAddress,
        EXCHANGE_CONTRACT_ADDRESS
      )
      if (approvedTokensBalRes) {
        const bigNumExchangeBal = ethers.BigNumber.from(approvedTokensBalRes)
        store.dispatch(setApprovedTokensBal(bigNumExchangeBal.toNumber()))
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export async function getWalletBalanceBuyFlow() {
  const accountAddress = store.getState()?.wallet?.accountAddress
  if (accountAddress) {
    try {
      const tokenContractFunctions =
        await BlockchainCalls.inr_usd_token_caller()
      const balanceCallRes = await tokenContractFunctions.balanceOf(
        accountAddress
      )
      if (balanceCallRes) {
        const bigNumExchangeBal = ethers.BigNumber.from(balanceCallRes)
        store.dispatch(setWalletBalBuyFlow(bigNumExchangeBal.toNumber()))
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export async function getBalanceOnExchangeBuyFlow() {
  const accountAddress = store.getState()?.wallet?.accountAddress
  if (accountAddress) {
    try {
      const exchangeContractFunctions = await BlockchainCalls.exchange_caller()
      const exchangeBal = await exchangeContractFunctions.balances(
        accountAddress,
        INR_USD_TOKEN_ADDRESS
      )
      const bigNumExchangeBal = ethers.BigNumber.from(exchangeBal)
      store.dispatch(setExchangeBalBuyFlow(bigNumExchangeBal.toNumber()))
    } catch (err) {
      console.log(err)
    }
  }
}

export async function getApprovedTokensBalanceBuyFlow() {
  const accountAddress = store.getState()?.wallet?.accountAddress
  try {
    const tokenContractFunctions = await BlockchainCalls.inr_usd_token_caller()
    const approvedTokensBalRes = await tokenContractFunctions.allowance(
      accountAddress,
      EXCHANGE_CONTRACT_ADDRESS
    )
    if (approvedTokensBalRes) {
      const bigNumExchangeBal = ethers.BigNumber.from(approvedTokensBalRes)
      store.dispatch(setApprovedTokensBalBuyFlow(bigNumExchangeBal.toNumber()))
    }
  } catch (err) {
    console.log(err)
  }
}

export async function requestApprovalForTokenSelling() {
  const sellQuantityForApprove =
    store.getState()?.marketplace?.sellQuantityForApprove

  try {
    store.dispatch(setMarketplaceLoading(true))
    store.dispatch(setOnGoingApproveRedux(null))
    setLocalItem(LOCAL_STORAGE_VARS?.ON_GOING_APPROVE_DATA_SELL_FLOW, null)
    setLocalItem(LOCAL_STORAGE_VARS?.SELL_QUANTITY_FOR_APPROVE, null)

    const tokenContractFunctions = await BlockchainCalls.token_caller()
    const approveFnRes = await tokenContractFunctions.approve(
      EXCHANGE_CONTRACT_ADDRESS, // exchangeAddress
      Number(sellQuantityForApprove)
    )
    if (approveFnRes) {
      setLocalItem(
        LOCAL_STORAGE_VARS?.ON_GOING_APPROVE_DATA_SELL_FLOW,
        approveFnRes
      )
      setLocalItem(
        LOCAL_STORAGE_VARS?.SELL_QUANTITY_FOR_APPROVE,
        sellQuantityForApprove
      )
      store.dispatch(setOnGoingApproveRedux(approveFnRes))
      store.dispatch(setSellQuantityForApprove(0))

      store.dispatch(
        setMarketplaceModalMessage(
          'Request sent for token approval. Please check once blockchain call is completed from Ongoing Approve tab.'
        )
      )
      store.dispatch(setShowMarketplaceMsgModal(true))
    }
  } catch (err) {
    // show proper error message
    console.log('Error: ' + JSON.stringify(err))
    // alert("JSON.stringify(err)")
  } finally {
    store.dispatch(setMarketplaceLoading(false))
  }
}
export async function requestApprovalForTokenBuy() {
  const buyQuantityForApprove =
    store.getState()?.marketplace?.buyQuantityForApprove

  try {
    store.dispatch(setMarketplaceLoading(true))
    store.dispatch(setOnGoingApproveRedux(null))
    setLocalItem(LOCAL_STORAGE_VARS?.ON_GOING_APPROVE_DATA_BUY_FLOW, null)
    setLocalItem(LOCAL_STORAGE_VARS?.BUY_QUANTITY_FOR_APPROVE, null)
    const inrContractFunctions = await BlockchainCalls.inr_usd_token_caller()
    const approveFnRes = await inrContractFunctions.approve(
      EXCHANGE_CONTRACT_ADDRESS, // exchangeAddress
      Number(buyQuantityForApprove)
    )
    if (approveFnRes) {
      setLocalItem(
        LOCAL_STORAGE_VARS?.ON_GOING_APPROVE_DATA_BUY_FLOW,
        approveFnRes
      )
      setLocalItem(
        LOCAL_STORAGE_VARS?.BUY_QUANTITY_FOR_APPROVE,
        buyQuantityForApprove
      )
      store.dispatch(setOnGoingApproveReduxBuyFlow(approveFnRes))
      store.dispatch(setBuyQuantityForApprove(0))

      store.dispatch(
        setMarketplaceModalMessage(
          'Request sent for token approval. Please check once blockchain call is completed from Ongoing Approve tab.'
        )
      )
      store.dispatch(setShowMarketplaceMsgModal(true))
    }
  } catch (err) {
    // show proper error message
    console.log('Error: ' + JSON.stringify(err))
    // alert("JSON.stringify(err)")
  } finally {
    store.dispatch(setMarketplaceLoading(false))
  }
}
export const getTransaction = async (txId: string) => {
  if (txId) {
    try {
      const res: any = await provider.getTransaction(txId)
      if (res) {
        let success = false
        if (res?.blockHash) {
          success = true
        }
        return { res, success }
      }
    } catch (error) {
      console.log(
        'Error in transactionCalls.getTransactionByUser api : ',
        error
      )
    }
  }
}

export async function depositERC20() {
  const accountAddress = store.getState()?.wallet?.accountAddress
  const sellQuantityForDeposit =
    store.getState()?.marketplace?.sellQuantityForDeposit

  const payload = {
    _user: accountAddress,
    _token: TOKEN_CONTRACT_ADDRESS,
    _amount: Number(sellQuantityForDeposit),
    _expectedAmount: Number(sellQuantityForDeposit),
  }
  try {
    store.dispatch(setMarketplaceLoading(true))
    const depositERC20Res = await marketplaceCalls.depositERC20(payload)
    console.log('depositERC20Res', depositERC20Res)

    if (depositERC20Res.success) {
      // return
      const txId = depositERC20Res?.data?.transactionId
      getApprovedTokensBalance()
      getBalanceOnExchange()
      store.dispatch(setOnGoingDepositTxIdReduxSellFlow(txId))
      store.dispatch(setSellQuantityForDeposit(0))
      setLocalItem(LOCAL_STORAGE_VARS.ON_GOING_DEPOSIT_TX_ID_SELL_FLOW, txId)
      setLocalItem(
        LOCAL_STORAGE_VARS.SELL_QUANTITY_FOR_DEPOSIT,
        sellQuantityForDeposit
      )
      checkBlockchainTransactionComplete(
        txId,
        MARKETPLACE_CALL_TYPES.DEPOSIT_SELL_FLOW,
        setOngoingDepositTransactionSellFlow
      )
      // alert('amount deposited')

      store.dispatch(
        setMarketplaceModalMessage(
          'Request sent to deposit token. Please check once blockchain call is completed from Ongoing Deposit tab.'
        )
      )
      store.dispatch(setShowMarketplaceMsgModal(true))
    } else {
      alert(depositERC20Res?.error)
    }
  } catch (err) {
    console.log('Error in marketplaceCalls.depositERC20 api : ' + err)
  } finally {
    store.dispatch(setMarketplaceLoading(false))
  }
}
export async function depositERC20BuyFlow() {
  const accountAddress = store.getState()?.wallet?.accountAddress
  const buyQuantityForDeposit =
    store.getState()?.marketplace?.buyQuantityForDeposit

  const payload = {
    _user: accountAddress,
    _token: INR_USD_TOKEN_ADDRESS,
    _amount: Number(buyQuantityForDeposit),
    _expectedAmount: Number(buyQuantityForDeposit),
  }
  try {
    store.dispatch(setMarketplaceLoading(true))
    const depositERC20Res = await marketplaceCalls.depositERC20(payload)
    if (depositERC20Res.success) {
      const txId = depositERC20Res?.data?.transactionId

      getApprovedTokensBalanceBuyFlow()
      getBalanceOnExchangeBuyFlow()
      store.dispatch(setBuyQuantityForDeposit(0))
      store.dispatch(setOnGoingDepositTxIdReduxBuyFlow(txId))
      setLocalItem(LOCAL_STORAGE_VARS.ON_GOING_DEPOSIT_TX_ID_BUY_FLOW, txId)
      setLocalItem(
        LOCAL_STORAGE_VARS.BUY_QUANTITY_FOR_DEPOSIT,
        buyQuantityForDeposit
      )
      checkBlockchainTransactionComplete(
        txId,
        MARKETPLACE_CALL_TYPES.DEPOSIT_BUY_FLOW,
        setOngoingDepositTransactionBuyFlow
      )
      // alert('amount deposited')

      store.dispatch(
        setMarketplaceModalMessage(
          'Request sent to deposit token. Please check once blockchain call is completed from Ongoing Deposit tab.'
        )
      )
      store.dispatch(setShowMarketplaceMsgModal(true))
    } else {
      alert(depositERC20Res?.error)
    }
  } catch (err) {
    console.log('Error in marketplaceCalls.depositERC20 api : ' + err)
  } finally {
    store.dispatch(setMarketplaceLoading(false))
  }
}

export async function createSellOrder() {
  try {
    store.dispatch(setMarketplaceLoading(true))
    const sellQuantityForSellOrder =
      store.getState()?.marketplace?.sellQuantityForSellOrder
    const sellUnitPriceForSellOrder: any =
      store.getState()?.marketplace?.sellUnitPriceForSellOrder
    const accountAddress = store.getState()?.wallet?.accountAddress

    // const nonce = await provider.getTransactionCount(accountAddress)
    const randomNumber = new Date().getTime()
    const hashAndVRS = await getHashAndVRS('sell', randomNumber)
    if (hashAndVRS) {
      const { hash, v, r, s } = hashAndVRS

      const payload = {
        _maker: accountAddress, //wallet address
        _offerAsset: TOKEN_CONTRACT_ADDRESS, // Carbon Token address
        _wantAsset: INR_USD_TOKEN_ADDRESS, // INR/USD Token address
        _offerAmount: Number(sellQuantityForSellOrder), //quantity
        _wantAmount: Number(sellUnitPriceForSellOrder), //unit
        _feeAsset: TOKEN_CONTRACT_ADDRESS, //carbon token address
        _feeAmount: 1, //1
        // _nonce: nonce, //like in submit see getnonce()
        _nonce: randomNumber, //like in submit see getnonce()
        hash: hash,
        _v: v,
        _r: r,
        _s: s,
      }

      const createOrderRes = await marketplaceCalls.createOrder(payload)

      if (createOrderRes.success) {
        const txId =
          createOrderRes?.data?.transactions?.create[0]?.transactionHash
        getBalanceOnExchange()
        getApprovedTokensBalance()

        // setLocalItem(
        //   LOCAL_STORAGE_VARS.SELL_QUANTITY_FOR_DEPOSIT,
        //   sellQuantityForSellOrder
        // )
        setLocalItem(
          LOCAL_STORAGE_VARS.SELL_QUANTITY_FOR_SELL_ORDER,
          sellQuantityForSellOrder
        )
        setLocalItem(LOCAL_STORAGE_VARS.ON_GOING_SELL_ORDER_TX_ID, txId)
        checkBlockchainTransactionComplete(
          txId,
          MARKETPLACE_CALL_TYPES.CREATE_SELL_ORDER,
          setOngoingSellOrderTransaction
        )
        // alert('Sell order created')

        store.dispatch(
          setMarketplaceModalMessage(
            'Sell order created. Please check once blockchain call is completed from Ongoing Sell Order tab.'
          )
        )
        store.dispatch(setShowMarketplaceMsgModal(true))
      } else {
        alert(createOrderRes?.error)
      }
    }
  } catch (err) {
    console.log('Error in marketplaceCalls.createOrder api : ' + err)
  } finally {
    store.dispatch(setMarketplaceLoading(false))
  }
}

export async function createWithdrawOrder() {
  try {
    store.dispatch(setMarketplaceLoading(true))
    const uuid = getLocalItem('userDetails')?.uuid

    const withdrawQuantity = store.getState()?.marketplace?.withdrawQuantity
    const accountAddress = store.getState()?.wallet?.accountAddress

    //pseudo nonce
    const randomNumber = new Date().getTime()
    const hashAndVRS = await getHashAndVRS('withdraw', randomNumber)
    if (hashAndVRS) {
      const { hash, v, r, s } = hashAndVRS

      const payload = {
        hash,
        _withdrawer: accountAddress,
        _token: TOKEN_CONTRACT_ADDRESS,
        _amount: Number(withdrawQuantity),
        _feeAsset: TOKEN_CONTRACT_ADDRESS,
        _feeAmount: 1,
        _nonce: randomNumber,
        _v: v,
        _r: r,
        _s: s,
      }

      const withdrawOrderRes = await marketplaceCalls.withdraw(payload)
      if (withdrawOrderRes.success) {
        const txId =
          withdrawOrderRes?.data?.transactions?.withdraw[0]?.transactionHash
        // getBalanceOnExchange()
        // getApprovedTokensBalance()

        setLocalItem(LOCAL_STORAGE_VARS.WITHDRAW_QUANTITY, withdrawQuantity)
        setLocalItem(LOCAL_STORAGE_VARS.ON_GOING_WITHDRAW_ORDER_TX_ID, txId)
        checkBlockchainTransactionComplete(
          txId,
          MARKETPLACE_CALL_TYPES.WITHDRAW_ORDER,
          setOngoingWithdrawOrderTransaction
        )
        // alert('Withdraw order created')
        store.dispatch(
          setMarketplaceModalMessage(
            'Withdraw order created. Please check once blockchain call is completed from Ongoing Withdraw Order tab.'
          )
        )
        store.dispatch(setShowMarketplaceMsgModal(true))
      } else {
        alert(withdrawOrderRes?.error)
      }
    }
  } catch (err) {
    console.log('Error in marketplaceCalls.withdraw api : ' + err)
  } finally {
    store.dispatch(setMarketplaceLoading(false))
  }
}

export async function createBuyOrder() {
  try {
    store.dispatch(setMarketplaceLoading(true))
    const accountAddress = store.getState()?.wallet?.accountAddress
    const buyOrderPayloadOfferHashes =
      store.getState()?.marketplace?.buyOrderPayloadOfferHashes
    const buyOrderPayloadAmountsToTake =
      store.getState()?.marketplace?.buyOrderPayloadAmountsToTake
    const buyOrderPayloadUUID =
      store.getState()?.marketplace?.buyOrderPayloadUUID
    const totalAmountForBuying =
      store.getState()?.marketplace?.totalAmountForBuying

    // const nonce = await provider.getTransactionCount(accountAddress)
    const randomNumber = new Date().getTime()
    const hashAndVRS = await getHashAndVRS('buy', randomNumber)

    if (hashAndVRS) {
      const { hash, v, r, s } = hashAndVRS
      const payload = {
        uuid: buyOrderPayloadUUID, //!todo
        filler: accountAddress, //!todo
        _offerHashes: buyOrderPayloadOfferHashes,
        _amountsToTake: buyOrderPayloadAmountsToTake,
        _feeAsset: INR_USD_TOKEN_ADDRESS, //inr_usd token address
        _feeAmount: Number(totalAmountForBuying),
        _nonce: randomNumber, //like in submit see getnonce()
        hash: hash,
        _v: v,
        _r: r,
        _s: s,
      }
      const createOrderRes = await marketplaceCalls.fillOrder(payload)
      if (createOrderRes.success) {
        // store.dispatch(setIntervalTime(4))`

        getBalanceOnExchange()
        getApprovedTokensBalanceBuyFlow()

        store.dispatch(setBuyOrderPayloadOfferHashes(null))
        store.dispatch(setBuyOrderPayloadAmountsToTake(null))

        const txId = createOrderRes?.data?.transactionHash
        const totalBuyQuantity = buyOrderPayloadAmountsToTake.reduce(
          (prev: any, curr: any) => {
            return (prev += curr)
          },
          0
        )
        store.dispatch(setBuyOrderPayloadUUID(null))
        store.dispatch(setBuyOrderPayloadOfferHashes(null))
        store.dispatch(setBuyOrderPayloadAmountsToTake(null))
        store.dispatch(setOnGoingBuyOrderTxIdRedux(txId))
        setLocalItem(LOCAL_STORAGE_VARS.ON_GOING_BUY_ORDER_TX_ID, txId || '')
        setLocalItem(
          LOCAL_STORAGE_VARS.BUY_QUANTITY_FOR_BUY_ORDER,
          totalBuyQuantity
        )
        checkBlockchainTransactionComplete(
          txId,
          MARKETPLACE_CALL_TYPES.CREATE_BUY_ORDER,
          setOngoingBuyOrderTransaction
        )
        // alert('Buy order created')

        store.dispatch(
          setMarketplaceModalMessage(
            'Buy order created. Please check once blockchain call is completed from Ongoing Buy Order tab.'
          )
        )
        store.dispatch(setShowMarketplaceMsgModal(true))
      } else {
        alert(createOrderRes.error)
      }
    }
  } catch (err) {
    console.log('Error in marketplaceCalls.createOrder api : ' + err)
  } finally {
    store.dispatch(setMarketplaceLoading(false))
  }
}

async function getHashAndVRS(type: string, randomNumber: any) {
  try {
    let hash: any
    const accountAddress = store.getState()?.wallet?.accountAddress
    if (type === 'sell') {
      const sellQuantityForSellOrder =
        store.getState()?.marketplace?.sellQuantityForSellOrder
      const sellUnitPriceForSellOrderCopy: any =
        store.getState()?.marketplace?.sellUnitPriceForSellOrder

      const nonce: any = await provider.getTransactionCount(accountAddress)
      //Explicitly needed to make them any since typescript was giving type errors when assigining these values to "value" key in "hash" generation(SoliditySHA3 fn)
      const feeAmount: any = 1
      const sellQuantityForSellOrderCopy: any = Number(sellQuantityForSellOrder)
      // const sellUnitPriceCopy: any = Number(sellUnitPrice)
      hash = new Web3().utils.soliditySha3(
        { type: 'string', value: 'makeOffer' },
        { type: 'address', value: accountAddress },
        { type: 'address', value: TOKEN_CONTRACT_ADDRESS },
        { type: 'address', value: INR_USD_TOKEN_ADDRESS },
        { type: 'uint256', value: sellQuantityForSellOrderCopy },
        { type: 'uint256', value: sellUnitPriceForSellOrderCopy },
        { type: 'address', value: TOKEN_CONTRACT_ADDRESS },
        { type: 'uint256', value: feeAmount },
        // { type: 'uint64', value: nonce }
        { type: 'uint64', value: randomNumber }
      )
      // console.log('hashPayload', {
      //   '': { type: 'string', value: 'makeOffer' },
      //   'data._maker': { type: 'address', value: accountAddress },
      //   'data._offerAsset': { type: 'address', value: TOKEN_CONTRACT_ADDRESS },
      //   'data._wantAsset': { type: 'address', value: INR_USD_TOKEN_ADDRESS },
      //   'data._offerAmount': { type: 'uint256', value: sellQuantityCopy },
      //   'data._wantAmount': { type: 'uint256', value: sellUnitPriceForSellOrderCopyß },
      //   'data._feeAsset': { type: 'address', value: TOKEN_CONTRACT_ADDRESS },
      //   'data._feeAmount': { type: 'uint256', value: feeAmount },
      //   'data._nonce': { type: 'uint64', value: nonce },
      // })
    } else if (type === 'withdraw') {
      const withdrawQuantity = store.getState()?.marketplace?.withdrawQuantity

      const nonce: any = await provider.getTransactionCount(accountAddress)
      //Explicitly needed to make them any since typescript was giving type errors when assigining these values to "value" key in "hash" generation(SoliditySHA3 fn)
      const feeAmount: any = 1
      const withdrawQuantityCopy: any = Number(withdrawQuantity)
      // const sellUnitPriceCopy: any = Number(sellUnitPrice)
      hash = new Web3().utils.soliditySha3(
        { type: 'string', value: 'withdraw' },
        { type: 'address', value: accountAddress },
        { type: 'address', value: TOKEN_CONTRACT_ADDRESS },
        { type: 'uint256', value: withdrawQuantityCopy },
        { type: 'address', value: TOKEN_CONTRACT_ADDRESS },
        { type: 'uint256', value: feeAmount },
        { type: 'uint64', value: randomNumber }
      )
      // console.log('wthdrawhashPayload', {
      //   '': { type: 'string', value: 'withdraw' },
      //   'data._withdrawer': { type: 'address', value: accountAddress },
      //   'data._token': { type: 'address', value: TOKEN_CONTRACT_ADDRESS },
      //   'data._amount': { type: 'uint256', value: withdrawQuantityCopy },
      //   'data._feeAsset': { type: 'address', value: TOKEN_CONTRACT_ADDRESS },
      //   'data._feeAmount': { type: 'uint256', value: feeAmount },
      //   'data._nonce': { type: 'uint64', value: randomNumber },
      // })
    } else {
      //for buy order
      const buyOrderPayloadOfferHashes =
        store.getState()?.marketplace?.buyOrderPayloadOfferHashes
      const buyOrderPayloadAmountsToTake =
        store.getState()?.marketplace?.buyOrderPayloadAmountsToTake
      const totalAmountForBuying: any =
        store.getState()?.marketplace?.totalAmountForBuying

      //Explicitly needed to make them "any" since typescript was giving type errors when assigining these values to "value" key in "hash" generation(SoliditySHA3 fn)
      const nonce: any = await provider.getTransactionCount(accountAddress)
      const feeAmount: any = 1
      const totalAmountForBuyingCopy: any = Number(totalAmountForBuying)

      hash = new Web3().utils.soliditySha3(
        { type: 'string', value: 'fillOffers' },
        { type: 'address', value: accountAddress },
        { type: 'bytes32[]', value: buyOrderPayloadOfferHashes }, //!todo
        { type: 'uint256[]', value: buyOrderPayloadAmountsToTake },
        { type: 'address', value: INR_USD_TOKEN_ADDRESS },
        { type: 'uint256', value: totalAmountForBuyingCopy },
        { type: 'uint64', value: randomNumber }
      )
    }

    if (!hash) throw new Error('No hash generated')
    const toPassParam = [accountAddress, hash]
    const signature = await BlockchainCalls.requestMethodCalls(
      'personal_sign',
      toPassParam
    )
    const sig = signature.slice(2)
    const v = new Web3().utils.toDecimal(`0x${sig.slice(128, 130)}`)
    const r = `0x${sig.slice(0, 64)}`
    const s = `0x${sig.slice(64, 128)}`
    return { v, r, s, hash }
  } catch (e) {
    console.log(e)
  }
}

export function checkBlockchainTransactionComplete(
  txId: string,
  callType: string,
  setOngoingTransaction: any
) {
  if (txId && callType && setOngoingTransaction) {
    const intervalId = setInterval(() => {
      getTransactionsAPI(txId, callType, setOngoingTransaction, intervalId)
    }, 3000)
    checkForPendingTransactions(
      txId,
      callType,
      setOngoingTransaction,
      intervalId
    )
  }
}

const checkForPendingTransactions = async (
  txId: string,
  callType: string,
  setOngoingTransaction: any,
  intervalId: any
) => {
  console.log('Web3 check started', txId)
  try {
    const receipt: any = await getTransaction(txId)
    if (receipt) {
      //This means approve call is done and put in blockchain
      const newReceipt: any = await receipt?.res.wait()
      if (newReceipt?.blockHash && txId) {
        console.log('web3 tx complete')
        callsToMakeAfterBlockchainSuccess(
          callType,
          setOngoingTransaction,
          intervalId
        )
      } else {
        store.dispatch(setOngoingTransaction({ txId, complete: false }))
      }
      getApprovedTokensBalance()
    }
  } catch (err) {
    console.log('Error ', err)
  }
}

const getTransactionsAPI = async (
  txId: string,
  callType: string,
  setOngoingTransaction: any,
  intervalId: any
) => {
  if (txId) {
    try {
      const res = await transactionCalls.getTransactionById(txId)
      if (res?.success) {
        store.dispatch(
          setOngoingTransaction({
            txId,
            complete: res?.data?.confirm ? true : false,
          })
        )
        if (res?.data?.confirm && txId) {
          callsToMakeAfterBlockchainSuccess(
            callType,
            setOngoingTransaction,
            intervalId
          )
        } else {
          store.dispatch(setOngoingTransaction({ txId, complete: false }))
        }
      }
    } catch (err) {
      console.log('Error ', err)
    }
  }
}

const callsToMakeAfterBlockchainSuccess = (
  callType: string,
  setOngoingTransaction: any,

  intervalId: any
) => {
  switch (callType) {
    case MARKETPLACE_CALL_TYPES.DEPOSIT_SELL_FLOW: {
      clearInterval(intervalId)

      store.dispatch(setOngoingTransaction(null))
      store.dispatch(setSellQuantityForDeposit(0))

      getWalletBalance()
      getApprovedTokensBalance()
      getBalanceOnExchange()

      setLocalItem(LOCAL_STORAGE_VARS.ON_GOING_DEPOSIT_TX_ID_SELL_FLOW, null)

      return
    }
    case MARKETPLACE_CALL_TYPES.DEPOSIT_BUY_FLOW: {
      return
    }
    case MARKETPLACE_CALL_TYPES.CREATE_BUY_ORDER: {
      clearInterval(intervalId)

      store.dispatch(setBuyQuantityForBuyOrder(0))
      store.dispatch(setOngoingTransaction(null))

      getWalletBalanceBuyFlow()
      getApprovedTokensBalanceBuyFlow()
      getBalanceOnExchangeBuyFlow()

      setLocalItem(LOCAL_STORAGE_VARS.ON_GOING_BUY_ORDER_TX_ID, null)

      return
    }
    case MARKETPLACE_CALL_TYPES.CREATE_SELL_ORDER: {
      clearInterval(intervalId)

      store.dispatch(setOngoingTransaction(null))
      store.dispatch(setSellQuantityForSellOrder(0))
      store.dispatch(setSellUnitPriceForSellOrder(0))

      getWalletBalance()
      getApprovedTokensBalance()
      getBalanceOnExchange()

      setLocalItem(LOCAL_STORAGE_VARS.ON_GOING_SELL_ORDER_TX_ID, null)

      return
    }
    case MARKETPLACE_CALL_TYPES.WITHDRAW_ORDER: {
      clearInterval(intervalId)

      store.dispatch(setOngoingTransaction(null))
      store.dispatch(setWithdrawQuantity(0))

      getWalletBalance()
      getApprovedTokensBalance()
      getBalanceOnExchange()

      setLocalItem(LOCAL_STORAGE_VARS.ON_GOING_WITHDRAW_ORDER_TX_ID, null)

      return
    }
  }
}

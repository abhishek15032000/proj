import { ethers } from 'ethers'
import Web3 from 'web3'
import { marketplaceCalls } from '../api/marketplaceCalls.api'
import BlockchainCalls from '../blockchain/Blockchain'
import { EXCHANGE_CONTRACT_ADDRESS } from '../config/exchange.config'
import { LOCAL_STORAGE_VARS } from '../config/roles.config'
import {
  INR_USD_TOKEN_ADDRESS,
  TOKEN_CONTRACT_ADDRESS,
} from '../config/token.config'
import {
  setApprovedTokensBal,
  setApprovedTokensBalBuyFlow,
  setBuyQuantityForApprove,
  setDataToMakeCreateBuyOrderCall,
  setDataToMakeCreateSellOrderCall,
  setDataToMakeDepositCall,
  setDataToMakeDepositCallBuyFlow,
  setExchangeBal,
  setExchangeBalBuyFlow,
  setOnGoingApproveRedux,
  setOnGoingApproveReduxBuyFlow,
  setSellQuantityForDeposit,
  setSellQuantityForSellOrder,
  setWalletBal,
  setWalletBalBuyFlow,
} from '../redux/Slices/marketplaceSlice'
import { store } from '../redux/store'
import { setLocalItem } from './Storage'

declare let window: any

const provider =
  window.ethereum != null
    ? new ethers.providers.Web3Provider(window.ethereum)
    : ethers.getDefaultProvider()

export async function getWalletBalance() {
  const accountAddress = store.getState()?.wallet?.accountAddress
  try {
    const tokenContractFunctions = await BlockchainCalls.token_caller()
    await tokenContractFunctions.estimateGas.balanceOf(accountAddress)
    const balanceCallRes = await tokenContractFunctions.balanceOf(
      accountAddress
    )
    // console.log('balanceCallRes', balanceCallRes)
    if (balanceCallRes) {
      const bal =
        Math.round(Number(balanceCallRes.toString()) * 10 ** -18 * 1000) / 1000
      store.dispatch(setWalletBal(bal))
    }
  } catch (err) {
    console.log(err)
  }
}

export async function getBalanceOnExchange() {
  const accountAddress = store.getState()?.wallet?.accountAddress
  try {
    const exchangeContractFunctions = await BlockchainCalls.exchange_caller()
    await exchangeContractFunctions.estimateGas.balances(
      accountAddress,
      EXCHANGE_CONTRACT_ADDRESS
    )
    const exchangeBal = await exchangeContractFunctions.balances(
      accountAddress,
      TOKEN_CONTRACT_ADDRESS
    )
    const bigNumExchangeBal = ethers.BigNumber.from(exchangeBal)
    store.dispatch(setExchangeBal(bigNumExchangeBal.toNumber()))
    console.log('exchangeBal', exchangeBal, '\n', bigNumExchangeBal.toNumber())
  } catch (err) {
    console.log(err)
  }
}

export async function getApprovedTokensBalance() {
  const accountAddress = store.getState()?.wallet?.accountAddress
  try {
    const tokenContractFunctions = await BlockchainCalls.token_caller()
    // await tokenContractFunctions.estimateGas.allowance(
    //   accountAddress,
    //   EXCHANGE_CONTRACT_ADDRESS
    // )
    const approvedTokensBalRes = await tokenContractFunctions.allowance(
      accountAddress,
      EXCHANGE_CONTRACT_ADDRESS
    )
    if (approvedTokensBalRes) {
      const bigNumExchangeBal = ethers.BigNumber.from(approvedTokensBalRes)
      store.dispatch(setApprovedTokensBal(bigNumExchangeBal.toNumber()))
      console.log(
        'appapprovedTokensBalRes',
        approvedTokensBalRes,
        '\n',
        bigNumExchangeBal.toNumber()
      )
    }
  } catch (err) {
    console.log(err)
  }
}

export async function getWalletBalanceBuyFlow() {
  const accountAddress = store.getState()?.wallet?.accountAddress
  try {
    const tokenContractFunctions = await BlockchainCalls.inr_usd_token_caller()
    const balanceCallRes = await tokenContractFunctions.balanceOf(
      accountAddress
    )
    // console.log('balanceCallRes', balanceCallRes)
    if (balanceCallRes) {
      // const bal =
      //   Math.round(Number(balanceCallRes.toString()) * 10 ** -18 * 1000) / 1000
      // console.log('bal', bal)
      const bigNumExchangeBal = ethers.BigNumber.from(balanceCallRes)
      store.dispatch(setWalletBalBuyFlow(bigNumExchangeBal.toNumber()))
      // store.dispatch(setWalletBalBuyFlow(bal))
    }
  } catch (err) {
    console.log(err)
  }
}

export async function getBalanceOnExchangeBuyFlow() {
  const accountAddress = store.getState()?.wallet?.accountAddress
  try {
    const exchangeContractFunctions = await BlockchainCalls.exchange_caller()
    // await exchangeContractFunctions.estimateGas.balances(
    //   accountAddress,
    //   INR_USD_TOKEN_ADDRESS
    // )
    const exchangeBal = await exchangeContractFunctions.balances(
      accountAddress,
      TOKEN_CONTRACT_ADDRESS
    )
    const bigNumExchangeBal = ethers.BigNumber.from(exchangeBal)
    store.dispatch(setExchangeBalBuyFlow(bigNumExchangeBal.toNumber()))
  } catch (err) {
    console.log(err)
  }
}

export async function getApprovedTokensBalanceBuyFlow() {
  const accountAddress = store.getState()?.wallet?.accountAddress
  try {
    const tokenContractFunctions = await BlockchainCalls.token_caller()
    // await tokenContractFunctions.estimateGas.allowance(
    //   accountAddress,
    //   INR_USD_TOKEN_ADDRESS
    // )
    const approvedTokensBalRes = await tokenContractFunctions.allowance(
      accountAddress,
      INR_USD_TOKEN_ADDRESS
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
  const buyQuantityForApprove =
    store.getState()?.marketplace?.buyQuantityForApprove

  try {
    store.dispatch(setOnGoingApproveRedux(null))
    setLocalItem(LOCAL_STORAGE_VARS?.ON_GOING_APPROVE_DATA_BUY_FLOW, null)
    setLocalItem(LOCAL_STORAGE_VARS?.BUY_QUANTITY_FOR_APPROVE, null)

    const inr_usdTokenFunctions = await BlockchainCalls.inr_usd_token_caller()
    const approveFnRes = await inr_usdTokenFunctions.approve(
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
    }
  } catch (err) {
    // show proper error message
    console.log('Error: ' + JSON.stringify(err))
    // alert("JSON.stringify(err)")
  }
}
export async function requestApprovalForTokenBuy() {
  const buyQuantityForApprove =
    store.getState()?.marketplace?.buyQuantityForApprove

  try {
    store.dispatch(setOnGoingApproveRedux(null))
    setLocalItem(LOCAL_STORAGE_VARS?.ON_GOING_APPROVE_DATA_BUY_FLOW, null)
    setLocalItem(LOCAL_STORAGE_VARS?.BUY_QUANTITY_FOR_APPROVE, null)
    // return
    const inrContractFunctions = await BlockchainCalls.token_caller()
    // const approveFnGas = await inrContractFunctions.estimateGas.approve(
    //   INR_USD_TOKEN_ADDRESS,
    //   Number(buyQuantity)
    // )
    const approveFnRes = await inrContractFunctions.approve(
      INR_USD_TOKEN_ADDRESS, // exchangeAddress
      Number(buyQuantityForApprove)
    )

    if (approveFnRes) {
      setLocalItem(
        LOCAL_STORAGE_VARS?.ON_GOING_APPROVE_DATA_SELL_FLOW,
        approveFnRes
      )
      setLocalItem(
        LOCAL_STORAGE_VARS?.BUY_QUANTITY_FOR_APPROVE,
        buyQuantityForApprove
      )
      store.dispatch(setOnGoingApproveReduxBuyFlow(approveFnRes))
    }
  } catch (err) {
    // show proper error message
    console.log('Error: ' + JSON.stringify(err))
    // alert("JSON.stringify(err)")
  }
}
export const getTransaction = async (txId: string) => {
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
    console.log('Error in transactionCalls.getTransactionByUser api : ', error)
  }
}

export async function depositERC20(_token?: any) {
  const accountAddress = store.getState()?.wallet?.accountAddress
  const sellQuantityForDeposit =
    store.getState()?.marketplace?.sellQuantityForDeposit
  const dataToMakeDepositCall =
    store.getState()?.marketplace?.dataToMakeDepositCall

  const payload = {
    _user: accountAddress,
    _token: TOKEN_CONTRACT_ADDRESS,
    _amount: Number(sellQuantityForDeposit),
    _expectedAmount: Number(sellQuantityForDeposit),
  }
  // console.log('payload', payload)
  // return
  try {
    const depositERC20Res = await marketplaceCalls.depositERC20(payload)
    if (depositERC20Res.success) {
      getApprovedTokensBalance()
      getBalanceOnExchange()
      //clear "To Deposit" tab data
      // store.dispatch(setDataToMakeDepositCall(null))
      // setLocalItem(LOCAL_STORAGE_VARS.DATA_FOR_CREATE_SELL_ORDER_CALL, null)
      //set "Create Sell Order" tab data
      // store.dispatch(setDataToMakeCreateSellOrderCall(dataToMakeDepositCall))
      // setLocalItem(
      //   LOCAL_STORAGE_VARS.DATA_FOR_CREATE_SELL_ORDER_CALL,
      //   dataToMakeDepositCall
      // )
      store.dispatch(setSellQuantityForDeposit(0))
      alert('amount deposited')
    } else {
      alert(depositERC20Res?.error)
    }
  } catch (err) {
    console.log('Error in marketplaceCalls.depositERC20 api : ' + err)
  }
}
export async function depositERC20BuyFlow(_token: any) {
  const accountAddress = store.getState()?.wallet?.accountAddress
  const buyQuantityForDeposit =
    store.getState()?.marketplace?.buyQuantityForDeposit
  const dataToMakeDepositCallBuyFlow =
    store.getState()?.marketplace?.dataToMakeDepositCallBuyFlow

  const payload = {
    _user: accountAddress,
    _token: INR_USD_TOKEN_ADDRESS,
    _amount: Number(buyQuantityForDeposit),
    _expectedAmount: Number(buyQuantityForDeposit),
  }
  try {
    const depositERC20Res = await marketplaceCalls.depositERC20(payload)
    if (depositERC20Res.success) {
      getApprovedTokensBalance()
      getBalanceOnExchange()
      //clear "To Deposit" tab data
      store.dispatch(setDataToMakeDepositCallBuyFlow(null))
      setLocalItem(LOCAL_STORAGE_VARS?.DATA_FOR_CREATE_BUY_ORDER_CALL, null)
      //set "Create Sell Order" tab data
      store.dispatch(
        setDataToMakeCreateBuyOrderCall(dataToMakeDepositCallBuyFlow)
      )
      setLocalItem(
        LOCAL_STORAGE_VARS?.DATA_FOR_CREATE_BUY_ORDER_CALL,
        dataToMakeDepositCallBuyFlow
      )
      alert('amount deposited')
    } else {
      alert(depositERC20Res?.error)
    }
  } catch (err) {
    console.log('Error in marketplaceCalls.depositERC20 api : ' + err)
  }
}

export async function createSellOrder() {
  try {
    const sellQuantityForSellOrder =
      store.getState()?.marketplace?.sellQuantityForSellOrder
    const sellUnitPriceForSellOrder: any =
      store.getState()?.marketplace?.sellUnitPriceForSellOrder
    const accountAddress = store.getState()?.wallet?.accountAddress

    const nonce = await provider.getTransactionCount(accountAddress)
    const hashAndVRS = await getHashAndVRS('sell')
    if (hashAndVRS) {
      const { hash, v, r, s } = hashAndVRS

      const payload = {
        _maker: accountAddress, //wallet address
        _offerAsset: TOKEN_CONTRACT_ADDRESS, // Carbon Token address
        _wantAsset: INR_USD_TOKEN_ADDRESS, // INR/USD Token address
        // _offerAmount: Number(sellQuantityForSellOrder), //quantity
        // _wantAmount: Number(sellUnitPrice), //unit
        _offerAmount: Number(sellQuantityForSellOrder), //quantity
        // _wantAmount: Number(sellQuantityForSellOrder), //unit
        _wantAmount: Number(sellUnitPriceForSellOrder), //unit
        _feeAsset: TOKEN_CONTRACT_ADDRESS, //carbon token address
        _feeAmount: 1, //1
        _nonce: nonce, //like in submit see getnonce()
        hash: hash,
        _v: v,
        _r: r,
        _s: s,
      }
      // console.log('payload', payload)

      const createOrderRes = await marketplaceCalls.createOrder(payload)
      if (createOrderRes.success) {
        getBalanceOnExchange()
        getApprovedTokensBalance()
        store.dispatch(setSellQuantityForSellOrder(0))
        //clear "Create Sell Order" tab data
        // store.dispatch(setDataToMakeCreateSellOrderCall(null))
        // setLocalItem(LOCAL_STORAGE_VARS.DATA_FOR_CREATE_SELL_ORDER_CALL, null)
        alert('Sell order created')
      } else {
        alert(createOrderRes?.error)
      }
    }
  } catch (err) {
    console.log('Error in marketplaceCalls.createOrder api : ' + err)
  }
}

export async function createBuyOrder() {
  try {
    const buyQuantityForBuyOrder =
      store.getState()?.marketplace?.buyQuantityForBuyOrder
    const accountAddress = store.getState()?.wallet?.accountAddress

    const nonce = await provider.getTransactionCount(accountAddress)
    const hashAndVRS = await getHashAndVRS('buy')
    if (hashAndVRS) {
      const { hash, v, r, s } = hashAndVRS

      const payload = {
        uuid: 'string', //!todo
        filler: accountAddress, //!todo
        _offerHashes: [
          //!todo
          'string',
        ],
        _amountsToTake: [0],

        _feeAsset: TOKEN_CONTRACT_ADDRESS, //carbon token address
        _feeAmount: 0, //1
        _nonce: nonce, //like in submit see getnonce()
        hash: hash,
        _v: v,
        _r: r,
        _s: s,
      }
      // console.log('payload', payload)

      const createOrderRes = await marketplaceCalls.createOrder(payload)
      if (createOrderRes.success) {
        getBalanceOnExchange()
        //clear "Create Sell Order" tab data
        store.dispatch(setDataToMakeCreateSellOrderCall(null))
        setLocalItem(LOCAL_STORAGE_VARS?.DATA_FOR_CREATE_SELL_ORDER_CALL, null)
        alert('Buy order created')
      } else {
        alert(createOrderRes.error)
      }
    }
  } catch (err) {
    console.log('Error in marketplaceCalls.createOrder api : ' + err)
  }
}

async function getHashAndVRS(type: string) {
  try {
    let hash: any
    const accountAddress = store.getState()?.wallet?.accountAddress
    if (type === 'sell') {
      const sellQuantityForSellOrder =
        store.getState()?.marketplace?.sellQuantityForSellOrder
      const sellUnitPriceForSellOrderCopy: any =
        store.getState()?.marketplace?.sellUnitPriceForSellOrder
      const ten: any = 10

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
        { type: 'uint64', value: nonce }
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
    } else {
      //for buy order
      const buyQuantityForBuyOrder =
        store.getState()?.marketplace?.buyQuantityForBuyOrder
      const buyUnitPrice = store.getState()?.marketplace?.buyUnitPrice

      const nonce: any = await provider.getTransactionCount(accountAddress)
      // const _offerHashes: any = //!todo
      //Explicitly needed to make them any since typescript was giving type errors when assigining these values to "value" key in "hash" generation(SoliditySHA3 fn)
      const feeAmount: any = 1
      const buyQuantityForBuyOrderCopy: any = Number(buyQuantityForBuyOrder)
      const buyUnitPriceCopy: any = Number(buyUnitPrice)
      hash = new Web3().utils.soliditySha3(
        { type: 'string', value: 'fillOffers' },
        { type: 'address', value: accountAddress },
        // { type: 'bytes32[]', value: data._offerHashes }, //!todo
        { type: 'uint256[]', value: buyQuantityForBuyOrderCopy },
        { type: 'address', value: TOKEN_CONTRACT_ADDRESS },
        { type: 'uint256', value: feeAmount },
        { type: 'uint64', value: nonce }
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

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
  setDataToMakeCreateSellOrderCall,
  setDataToMakeDepositCall,
  setExchangeBal,
  setOnGoingApproveRedux,
  setWalletBal,
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
  } catch (err) {
    console.log(err)
  }
}

export async function getApprovedTokensBalance() {
  const accountAddress = store.getState()?.wallet?.accountAddress
  try {
    const tokenContractFunctions = await BlockchainCalls.token_caller()
    await tokenContractFunctions.estimateGas.allowance(
      accountAddress,
      EXCHANGE_CONTRACT_ADDRESS
    )
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

export async function requestApprovalForTokenSelling() {
  const sellQuantity = store.getState()?.marketplace?.sellQuantity

  try {
    store.dispatch(setOnGoingApproveRedux(null))
    setLocalItem(LOCAL_STORAGE_VARS.ON_GOING_APPROVE_DATA, null)
    setLocalItem(LOCAL_STORAGE_VARS?.SELL_QUANTITY, null)
    // return
    const tokenContractFunctions = await BlockchainCalls.token_caller()
    const approveFnGas = await tokenContractFunctions.estimateGas.approve(
      EXCHANGE_CONTRACT_ADDRESS,
      Number(sellQuantity)
    )
    const approveFnRes = await tokenContractFunctions.approve(
      EXCHANGE_CONTRACT_ADDRESS, // exchangeAddress
      Number(sellQuantity)
    )

    if (approveFnRes) {
      setLocalItem(LOCAL_STORAGE_VARS?.ON_GOING_APPROVE_DATA, approveFnRes)
      setLocalItem(LOCAL_STORAGE_VARS?.SELL_QUANTITY, sellQuantity)
      store.dispatch(setOnGoingApproveRedux(approveFnRes))
    }
  } catch (err) {
    // show proper error message
    console.log('Error: ' + JSON.stringify(err))
    // alert("JSON.stringify(err)")
  }
}
export async function requestApprovalForTokenBuy() {
  const buyQuantity = store.getState()?.marketplace?.buyQuantity

  try {
    store.dispatch(setOnGoingApproveRedux(null))
    setLocalItem(LOCAL_STORAGE_VARS.ON_GOING_APPROVE_DATA, null)
    setLocalItem(LOCAL_STORAGE_VARS?.SELL_QUANTITY, null)
    // return
    const tokenContractFunctions = await BlockchainCalls.token_caller()
    const approveFnGas = await tokenContractFunctions.estimateGas.approve(
      INR_USD_TOKEN_ADDRESS,
      Number(buyQuantity)
    )
    const approveFnRes = await tokenContractFunctions.approve(
      INR_USD_TOKEN_ADDRESS, // exchangeAddress
      Number(buyQuantity)
    )

    if (approveFnRes) {
      setLocalItem(LOCAL_STORAGE_VARS?.ON_GOING_APPROVE_DATA, approveFnRes)
      setLocalItem(LOCAL_STORAGE_VARS?.SELL_QUANTITY, buyQuantity)
      store.dispatch(setOnGoingApproveRedux(approveFnRes))
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

export async function depositERC20(_token: any) {
  const accountAddress = store.getState()?.wallet?.accountAddress
  const sellQuantity = store.getState()?.marketplace?.sellQuantity
  const dataToMakeDepositCall =
    store.getState()?.marketplace?.dataToMakeDepositCall

  const payload = {
    _user: accountAddress,
    _token: TOKEN_CONTRACT_ADDRESS,
    _amount: Number(sellQuantity),
    _expectedAmount: Number(sellQuantity),
  }
  try {
    const depositERC20Res = await marketplaceCalls.depositERC20(payload)
    if (depositERC20Res.success) {
      getApprovedTokensBalance
      getBalanceOnExchange()
      //clear "To Deposit" tab data
      store.dispatch(setDataToMakeDepositCall(null))
      setLocalItem(LOCAL_STORAGE_VARS.DATA_FOR_CREATE_SELL_ORDER_CALL, null)
      //set "Create Sell Order" tab data
      store.dispatch(setDataToMakeCreateSellOrderCall(dataToMakeDepositCall))
      setLocalItem(
        LOCAL_STORAGE_VARS.DATA_FOR_CREATE_SELL_ORDER_CALL,
        dataToMakeDepositCall
      )
      alert('amount deposited')
    } else {
      alert(depositERC20Res.error)
    }
  } catch (err) {
    console.log('Error in marketplaceCalls.depositERC20 api : ' + err)
  }
}

export async function createSellOrder() {
  const sellQuantity = store.getState()?.marketplace?.sellQuantity
  const accountAddress = store.getState()?.wallet?.accountAddress

  const nonce = await provider.getTransactionCount(accountAddress)
  const hashAndVRS = await getHashAndVRS()
  const { hash, v, r, s } = hashAndVRS

  const payload = {
    _maker: accountAddress, //wallet address
    _offerAsset: TOKEN_CONTRACT_ADDRESS, // Carbon Token address
    _wantAsset: INR_USD_TOKEN_ADDRESS, // INR/USD Token address
    // _offerAmount: Number(sellQuantity), //quantity
    // _wantAmount: Number(sellUnitPrice), //unit
    _offerAmount: Number(sellQuantity), //quantity
    _wantAmount: Number(sellQuantity), //unit
    _feeAsset: TOKEN_CONTRACT_ADDRESS, //carbon token address
    _feeAmount: 1, //1
    _nonce: nonce, //like in submit see getnonce()
    hash: hash,
    _v: v,
    _r: r,
    _s: s,
  }
  // console.log('payload', payload)
  try {
    const createOrderRes = await marketplaceCalls.createOrder(payload)
    if (createOrderRes.success) {
      getBalanceOnExchange()
      //clear "Create Sell Order" tab data
      store.dispatch(setDataToMakeCreateSellOrderCall(null))
      setLocalItem(LOCAL_STORAGE_VARS.DATA_FOR_CREATE_SELL_ORDER_CALL, null)
      alert('Sell order created')
    } else {
      alert(createOrderRes.error)
    }
  } catch (err) {
    console.log('Error in marketplaceCalls.createOrder api : ' + err)
  }
}

async function getHashAndVRS() {
  const sellQuantity = store.getState()?.marketplace?.sellQuantity
  const sellUnitPrice = store.getState()?.marketplace?.sellUnitPrice
  const accountAddress = store.getState()?.wallet?.accountAddress

  const nonce: any = await provider.getTransactionCount(accountAddress)
  //Explicitly needed to make them any since typescript was giving type errors when assigining these values to "value" key in "hash" generation(SoliditySHA3 fn)
  const feeAmount: any = 1
  const sellQuantityCopy: any = Number(sellQuantity)
  const sellUnitPriceCopy: any = Number(sellUnitPrice)
  const hash: any = new Web3().utils.soliditySha3(
    { type: 'string', value: 'makeOffer' },
    { type: 'address', value: accountAddress },
    { type: 'address', value: TOKEN_CONTRACT_ADDRESS },
    { type: 'address', value: INR_USD_TOKEN_ADDRESS },
    { type: 'uint256', value: sellQuantityCopy },
    { type: 'uint256', value: sellQuantityCopy },
    { type: 'address', value: TOKEN_CONTRACT_ADDRESS },
    { type: 'uint256', value: feeAmount },
    { type: 'uint64', value: nonce }
  )
  // console.log('hashPayload', [
  //   { type: 'string', value: 'makeOffer' },
  //   { type: 'address', value: accountAddress },
  //   { type: 'address', value: TOKEN_CONTRACT_ADDRESS },
  //   { type: 'address', value: INR_USD_TOKEN_ADDRESS },
  //   { type: 'uint256', value: sellQuantityCopy },
  //   { type: 'uint256', value: sellQuantityCopy },
  //   { type: 'address', value: TOKEN_CONTRACT_ADDRESS },
  //   { type: 'uint256', value: feeAmount },
  //   { type: 'uint64', value: nonce },
  // ])
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
}

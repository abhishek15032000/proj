import { ethers } from 'ethers'
import {
  SHINE_CONTRACTS_ABI,
  SHINE_CONTRACT_ADDRESS,
} from '../config/blockchain.config'
import {
  EXCHANGE_ABI,
  EXCHANGE_CONTRACT_ADDRESS,
} from '../config/exchange.config'
import { TOKEN_ABI, TOKEN_CONTRACT_ADDRESS } from '../config/token.config'

declare let window: any

// const provider = new ethers.providers.Web3Provider(window.ethereum)
const provider =
  window.ethereum != null
    ? new ethers.providers.Web3Provider(window.ethereum)
    : ethers.getDefaultProvider()

const { ethereum } = window

const BlockchainCalls = {
  connectWallet: async () => {
    let isConnected = false
    let haveMetamask = false
    let accountAddress = undefined
    try {
      if (!ethereum) {
        haveMetamask = false
        throw new Error('metamask not available')
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      })

      accountAddress = accounts[0]
      isConnected = true

      return {
        haveMetamask,
        accountAddress,
        isConnected,
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: blockchain.ts ~ line 34 ~ connectWallet: ~ error',
        error
      )
      //   setIsConnected(false)
    }
  },
  getWalletBalance: async (accountAddress: string) => {
    try {
      const getBalance = await provider.getBalance(accountAddress)
      const balance = ethers.utils.formatEther(getBalance)

      return { balance }
    } catch (error) {
      //   setIsConnected(false)
      return { connected: false }
    }
  },
  getWalletNetwork: async () => {
    try {
      const getNetwork = await provider.getNetwork()
      console.log(
        '🚀 ~ file: Blockchain.ts ~ line 62 ~ getWalletNetwork: ~ getNetwork',
        getNetwork
      )
      // const balance = ethers.utils.formatEther(getBalance)

      return getNetwork
    } catch (error) {
      console.log(
        '🚀 ~ file: Blockchain.ts ~ line 126 ~ getWalletNetwork: ~ error',
        error
      )

      //   setIsConnected(false)
      return { connected: false }
    }
  },
  contract_caller: async (address?: string) => {
    const ethereum = (window as any).ethereum
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    })

    const provider = new ethers.providers.Web3Provider(ethereum)
    const walletAddress = accounts[0] // first account in MetaMask
    const signer = provider.getSigner(walletAddress)
    const shine_Contract = new ethers.Contract(
      SHINE_CONTRACT_ADDRESS,
      SHINE_CONTRACTS_ABI,
      signer
    )
    console.log(
      '🚀 ~ file: blockchain.ts ~ line 60 ~ contract_caller: ~ shine_Contract',
      shine_Contract
    )
    return shine_Contract
  },
  token_caller: async (address?: string) => {
    const ethereum = (window as any).ethereum
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    })

    const provider = new ethers.providers.Web3Provider(ethereum)
    const walletAddress = accounts[0] // first account in MetaMask
    const signer = provider.getSigner(walletAddress)
    const tokenContract = new ethers.Contract(
      TOKEN_CONTRACT_ADDRESS,
      TOKEN_ABI,
      signer
    )
    return tokenContract
  },
  exchange_caller: async (address?: string) => {
    const ethereum = (window as any).ethereum
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    })

    const provider = new ethers.providers.Web3Provider(ethereum)
    const walletAddress = accounts[0] // first account in MetaMask
    const signer = provider.getSigner(walletAddress)
    const exchangeContract = new ethers.Contract(
      EXCHANGE_CONTRACT_ADDRESS,
      EXCHANGE_ABI,
      signer
    )
    return exchangeContract
  },
  requestMethodCalls: async (method: string, params: any) => {
    try {
      const res = await window.ethereum.request({ method, params })
      return res
    } catch (e) {
      console.log('Error in Blockchain.ts - requestMethodCalls :', e)
    }
  },
  toHexConvert: (number: any) => ethers.utils.hexlify(number),
  getConnectionStatusAndAddress: async () => {
    const accounts = await ethereum.request({ method: 'eth_accounts' })

    let payload = {
      address: '',
      connected: false,
    }

    if (accounts.length) {
      payload = {
        address: accounts[0],
        connected: true,
      }
    }

    return payload
  },
}

export default BlockchainCalls

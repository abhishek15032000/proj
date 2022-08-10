import { ethers } from 'ethers'
import {
  SHINE_CONTRACTS_ABI,
  SHINE_CONTRACT_ADDRESS,
} from '../config/blockchian.configs'

declare let window: any

const provider = new ethers.providers.Web3Provider(window.ethereum)

const { ethereum } = window

const BlockchainCalls = {
  connectWallet: async () => {
    let isConnected = false
    let haveMetamask = false
    let accountAddress = undefined
    try {
      if (!ethereum) {
        haveMetamask = false
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
  contract_caller: async (address: string) => {
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
}

export default BlockchainCalls

import React, { useEffect } from 'react'
import { shallowEqual } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { useMarket } from '../../hooks/useMarket'
import {
  setCarbonTokenBalances,
  setINRTokenBalances,
} from '../../redux/Slices/newMarketplaceSlice'
// import {
//   getProjectsTokenDetails,
//   getSellOrdersListData,
//   getTokenBalances,
// } from '../../utils/newMarketplace.utils'
import { getLocalItem } from '../../utils/Storage'
import HeadingStrip from './HeadingStrip'
import Trading from './Trading'

const Marketplace = () => {
  const location: any = useLocation()
  const dispatch = useAppDispatch()
  const {
    getProjectsTokenDetails,
    getSellOrdersListData,
    getTokenBalances,
  } = useMarket()

  const userID = getLocalItem('userDetails')?.user_id

  const carbonTokenAddress = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.carbonTokenAddress,
    shallowEqual
  )
  const inrTokenAddress = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.inrTokenAddress,
    shallowEqual
  )

  useEffect(() => {
    if (location?.state?.projectUUID) {
      getProjectsTokenDetails(location?.state?.projectUUID)
    }
    getSellOrdersListData()
  }, [])

  useEffect(() => {
    if (carbonTokenAddress) {
      getCarbonTokenBalances()
    }
  }, [carbonTokenAddress])

  const getCarbonTokenBalances = async () => {
    const tokenBalances = await getTokenBalances(userID, carbonTokenAddress)
    if (tokenBalances.success) {
      dispatch(setCarbonTokenBalances(tokenBalances?.data))
    }
  }

  useEffect(() => {
    if (inrTokenAddress) {
      getINRTokenBalances()
    }
  }, [inrTokenAddress])

  const getINRTokenBalances = async () => {
    const tokenBalances = await getTokenBalances(userID, inrTokenAddress)
    if (tokenBalances.success) {
      dispatch(setINRTokenBalances(tokenBalances?.data))
    }
  }

  return (
    <>
      <HeadingStrip />
      <Trading />
    </>
  )
}

export default Marketplace

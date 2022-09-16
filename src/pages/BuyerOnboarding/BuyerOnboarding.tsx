import React from 'react'
import { BuyerOnboardingProps } from './BuyerOnboarding.interface'
import BuyerOnboardingComp from '../../components/BuyerOnboarding'
import LoadWallet from '../../components/LoadWallet'

const BuyerOnboarding = (props: BuyerOnboardingProps) => {
  return (
    <>
      <LoadWallet />
      <BuyerOnboardingComp />
    </>
  )
}
export default BuyerOnboarding

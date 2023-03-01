import React, { FC } from 'react'
import TitleValue from './TitleValue'
import TransactionHash from './TransactionHash'

interface TokenDeployedProps {
  tabData?: any
}

const TokenDeployed: FC<TokenDeployedProps> = (props) => {
  const { tabData } = props

  return (
    <>
      {tabData?.transactionId ? (
        <TransactionHash txID={tabData?.transactionId} />
      ) : (
        ''
      )}
      <TitleValue title="Carbon Token" value={tabData?.data?._tokenName} />
      <TitleValue title="Carbon Token" value={tabData?.data?._tokenSymbol} />
      <TitleValue title="Carbon Token" value={tabData?.data?._tokenType} />
    </>
  )
}
export default TokenDeployed

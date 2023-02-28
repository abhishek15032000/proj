import React, { FC } from 'react'
import TitleValue from './TitleValue'
import TransactionHash from './TransactionHash'

interface TokenDeployedProps {
  theme?: any
  tabData?: any
}

const TokenDeployed: FC<TokenDeployedProps> = (props) => {
  const { theme, tabData } = props

  return (
    <>
      {tabData?.transactionId ? (
        <TransactionHash txID={tabData?.transactionId} />
      ) : (
        ''
      )}
      <TitleValue
        title="Carbon Token"
        value={tabData?.data?._tokenName}
        theme={theme}
      />
      <TitleValue
        title="Carbon Token"
        value={tabData?.data?._tokenSymbol}
        theme={theme}
      />
      <TitleValue
        title="Carbon Token"
        value={tabData?.data?._tokenType}
        theme={theme}
      />
    </>
  )
}
export default TokenDeployed

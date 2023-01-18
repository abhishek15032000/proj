import React, { FC } from 'react'
import TitleValue from './TitleValue'

interface BuyerProps {
  traceOption?: any
  setTraceOption?: any
  theme?: any
  projectId?: any
  projectDetails?: any
  traceTab?: any
}

const Buyer: FC<BuyerProps> = (props) => {
  const { theme } = props

  return (
    <>
      <TitleValue title="Number of VCOT bought :" value={'-'} theme={theme} />
      <TitleValue title="Transaction  ID :" value={'-'} theme={theme} />
      <TitleValue title="Unit price :" value={'-'} theme={theme} />
      <TitleValue title="Total Price :" value={'-'} theme={theme} />
    </>
  )
}
export default Buyer

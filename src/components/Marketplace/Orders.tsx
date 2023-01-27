import React, { useState } from 'react'
import CCPaper from '../../atoms/CCPaper'
import CCTable from '../../atoms/CCTable'
import TabSelector from '../../atoms/TabSelector/TabSelector'

const headings = [
  'Time',
  'All pairs',
  'All Types',
  'Unit Price (USD)',
  'Price',
  'Amount',
  'Executed',
  'Unexecuted',
]
const rows = [['4337', '12/04/21', '19:21:28', '19:21:28', '50', '-', '-', '-']]

const Orders = () => {
  const [tabIndex, setTabIndex] = useState(1)

  return (
    <CCPaper>
      <TabSelector
        tabArray={['Open Orders', 'Closed Order', 'Order History']}
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
        sx={{ mt: 0 }}
      />
      <CCTable headings={headings} rows={rows} />
    </CCPaper>
  )
}

export default Orders

import { Grid, Typography } from '@mui/material'
import React, { FC } from 'react'
import CCPaper from '../../atoms/CCPaper'
import { Colors } from '../../theme'

const headings = ['Price (BTC)', 'Amount (ETH)', 'Total (ETH)']
const rows = [200, 2, 2]

const OrderBook = () => {
  return (
    <CCPaper customSX={{ height: '100%' }}>
      <Typography sx={{ fontSize: 18, color: Colors.darkPrimary1 }}>
        Order Book
      </Typography>
      {/* <HeadingRow headings={headings} /> */}
      <Row isHeading rows={headings} />
      <Row rows={rows} />
      <Row rows={rows} />
      <Row rows={rows} />
      <Row rows={rows} />
      <Row rows={rows} />
    </CCPaper>
  )
}

export default OrderBook

// interface HeadingRowProps {
//   headings: any
// }
// const HeadingRow: FC<HeadingRowProps> = ({ headings }) => {
//   return (
//     <Grid
//       container
//       sx={{ py: 1, px: 2, background: '#CCE8E1', borderRadius: '8px' }}
//     >
//       {headings.length > 0 &&
//         headings.map((heading: string, index: number) => (
//           <Grid
//             item
//             xs={4}
//             key={index}
//             sx={{ color: '141D1B', fontSize: 12, fontWeight: 500 }}
//           >
//             {heading}
//           </Grid>
//         ))}
//     </Grid>
//   )
// }

interface RowProps {
  isHeading?: boolean
  rows: any
}
const Row: FC<RowProps> = ({ isHeading, rows }) => {
  return (
    <Grid
      container
      sx={{
        py: 1,
        px: 2,
        background: isHeading ? '#CCE8E1' : '',
        borderRadius: '8px',
      }}
    >
      {rows.length > 0 &&
        rows.map((row: string, index: number) => (
          <Grid
            item
            xs={4}
            key={index}
            sx={{
              color: '141D1B',
              fontSize: isHeading ? 12 : 14,
              fontWeight: 500,
            }}
          >
            {row}
          </Grid>
        ))}
    </Grid>
  )
}

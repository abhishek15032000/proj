import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Button, Grid, Menu, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { shallowEqual } from 'react-redux'
import { marketplaceCalls } from '../../api/marketplaceCalls.api'
import CardRow from '../../atoms/CardRow/CardRow'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
  setBuyUnitPrice,
  setTotalAmountForBuying,
  setBuyOrderPayloadOfferHashes,
  setBuyOrderPayloadAmountsToTake,
  setBuyOrderPayloadUUID,
} from '../../redux/Slices/newMarketplaceSlice'
import { Colors } from '../../theme'

const BuyTokenPriceDetails = () => {
  const dispatch = useAppDispatch()

  const buyQuantity = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.buyQuantity,
    shallowEqual
  )
  const buyUnitPrice = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.buyUnitPrice,
    shallowEqual
  )
  const totalAmountForBuying = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.totalAmountForBuying,
    shallowEqual
  )

  const [tokenAndUnitPriceList, setTokenAndUnitPriceList] = useState<any>(null)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const checkForFullFillOrder = async () => {
    try {
      const res = await marketplaceCalls.checkForFullFillOrder(buyQuantity)
      console.log('res', res)
      if (res?.success && res?.data && res?.data?.length) {
        const offerHashes: any = []
        const amountsToTake: any = []
        const uuid: any = []
        const tokenAndUnitPrice: any[] = []

        const total = res?.data.reduce((prev: any, curr: any) => {
          offerHashes.push(curr.hash)
          amountsToTake.push(curr.cab)
          uuid.push(curr.uuid)
          tokenAndUnitPrice.push({ tokenQuantity: curr?.cab, rate: curr?.rate })
          return (prev += curr.cab * curr.rate)
        }, 0)
        const unitPriceLocal =
          Math.round((total / Number(buyQuantity)) * 1000) / 1000
        dispatch(setTotalAmountForBuying(total))
        dispatch(setBuyUnitPrice(unitPriceLocal))
        dispatch(setBuyOrderPayloadOfferHashes(offerHashes))
        dispatch(setBuyOrderPayloadAmountsToTake(amountsToTake))
        dispatch(setBuyOrderPayloadUUID(uuid))

        setTokenAndUnitPriceList(tokenAndUnitPrice)
      }
    } catch (err) {
      console.log('Error in marketplaceCalls.checkForFullFillOrder api :', err)
    }
  }
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          sx={{
            mt: 1,
            fontSize: 14,
            fontWeight: 500,
            color: buyQuantity ? Colors.textColorLightGreen : Colors.lightGray,
            cursor: buyQuantity ? 'pointer' : 'not-allowed',
            textDecoration: 'underline',
            width: 'fit-content',
          }}
          onClick={() => {
            if (buyQuantity) {
              checkForFullFillOrder()
            }
          }}
        >
          Click to check for Token and Unit Price
        </Typography>
        <Button sx={{ mt: 1, p: 0, ml: 1, minWidth: 0 }} onClick={handleClick}>
          <InfoOutlinedIcon sx={{ fontSize: 20 }} />
        </Button>
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{
          boxShadow: 'none',
          '.MuiMenu-paper': {
            boxShadow: '0px 5px 25px rgba(0, 0, 0, 0.12)',
            borderRadius: '16px',
            py: 1,
            px: 1,
          },
        }}
      >
        <Box
          sx={{
            borderRadius: '16px',
            fontSize: 14,
          }}
        >
          Respective Token Price(s)
          <Grid
            container
            sx={{
              mt: 1,
              p: 1,
              borderRadius: '8px',
              bgcolor: '#CCE8E1',
              fontWeight: 500,
            }}
          >
            <Grid item xs={6}>
              Quantity
            </Grid>
            <Grid item xs={6}>
              Unit Price
            </Grid>
          </Grid>
          {tokenAndUnitPriceList &&
            tokenAndUnitPriceList.length > 0 &&
            tokenAndUnitPriceList.map((item: any, index: number) => (
              <Grid
                container
                key={index}
                sx={{
                  p: 1,
                  borderRadius: '8px',
                  background: index % 2 == 0 ? '#fff' : '#e1eee8',
                  fontWeight: 500,
                }}
              >
                <Grid item xs={6}>
                  {item?.tokenQuantity}
                </Grid>
                <Grid item xs={6}>
                  {item?.rate}
                </Grid>
              </Grid>
            ))}
        </Box>
      </Menu>
      <CardRow title="Unit Price :" value={`${buyUnitPrice || 0} INR`} />
      <CardRow
        title="Total amount to be paid :"
        value={`${totalAmountForBuying.toFixed(3) || 0} INR`}
      />
      {/* {totalAmountForBuying > exchangeBalBuyFlow && (
        <Typography sx={{ mt: 1, fontSize: 14, color: Colors.tertiary }}>
          You have less INR balance for buying {buyQuantityForBuyOrder} tokens
        </Typography>
      )} */}
    </>
  )
}

export default BuyTokenPriceDetails

import React, { FC, useEffect, useRef, useState } from 'react'
import { Box } from '@mui/system'
import IcrLogo from '../../../assets/Images/logo/ICR_LOGO_1.svg'
import FooterImage from '../../../assets/Images/illustrations/Footer.svg'
import { Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { setPageIndexes } from '../../../redux/Slices/pdfSlice'

interface LayoutProps {
  title?: string | number
  heading?: string
  page?: number
  children: any
  child_ref?: any
  parent_ref?: any
  marginTop?: string | number
  page_dynamic?: boolean
}
let instancesCount = 0

const Layout: FC<LayoutProps> = (props) => {
  const dispatch = useAppDispatch()
  const [currentPage, setCurrentPage] = useState(0)
  const pageIndexes = useAppSelector(
    ({ pdfPage }) => pdfPage.pageIndexes,
    shallowEqual
  )

  useEffect(() => {
    instancesCount += 1
    // console.log('before', { instancesCount })
    setCurrentPage(instancesCount)
    return () => {
      instancesCount -= 1
      // console.log('afr', { instancesCount })
      setCurrentPage(instancesCount)
    }

    // setCurrentPage(instancesCount)
  }, [])

  // useEffect(() => {
  //   let indexes = pageIndexes
  //   const keys = Object.keys(indexes)
  //   console.log(
  //     typeof props?.title === 'string' ? props?.title?.replaceAll(' ', '_') : ''
  //   )
  //   const title =
  //     typeof props?.title === 'string' ? props?.title?.replaceAll(' ', '_') : ''
  //   // let val=Object.assign({indexes[title]:currentPage}, indexes)
  //   indexes = { [title.toString()]: currentPage }
  //   // }
  //   dispatch(setPageIndexes({ ...indexes }))
  //   console.log('final', indexes)
  // }, [currentPage])

  return (
    <Box
      // ref={renderCount}
      sx={{
        size: 'A4',
        // border: '1px solid red',
        // width: '21cm',
        height: '29.7cm',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        background: 'white',
      }}
    >
      <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}>
        <img src={FooterImage} alt="footer image" style={{ width: '100%' }} />
      </Box>
      {true && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 15,
            left: '50%',
            transform: 'translateX(-50%)',
            height: 24,
            width: 24,
            background: '#BBF7ED',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50%',
          }}
        >
          <Box sx={{ fontSize: 14, fontWeight: 500, color: '#00201B' }}>
            {/* {props?.page} */}

            {currentPage}
          </Box>
        </Box>
      )}
      <Box
        sx={{
          position: 'relative',
          pt: 2,
          pb: 1,
          px: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <img src={IcrLogo} alt="icr" />
          </Box>
          <Box>
            <Typography
              sx={{ color: '#006B5E', fontSize: 12, fontWeight: 500 }}
            >
              {props?.title}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            height: '5px',
            width: '92%',
            right: 0,
            bottom: 0,
            background: '#BBF7ED',
            borderRadius: '40px 0px 0px 40px',
          }}
        ></Box>
      </Box>
      <Box sx={{ flexGrow: '1', py: 4, pb: 9 }}>
        <Box sx={{ position: 'relative', overflow: 'hidden', height: '100%' }}>
          <Box
            sx={{
              // border: '1px solid green',
              height: '100%',
            }}
            ref={props?.parent_ref}
          >
            <Box
              sx={{
                // border: '1px solid green',
                width: '100%',
                position: 'absolute',
                marginTop: props?.marginTop || 0,
                height: props?.page_dynamic ? 'auto' : '100%',
              }}
              ref={props?.child_ref}
            >
              {props?.heading && (
                <Typography
                  sx={{
                    pb: 4,
                    fontSize: 24,
                    fontWeight: 600,
                    color: '#006B5E',
                    px: 4,
                  }}
                >
                  {props?.heading}
                </Typography>
              )}
              <Box
                sx={{ px: 4, height: props?.page_dynamic ? 'auto' : '100%' }}
              >
                {props?.children}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Layout

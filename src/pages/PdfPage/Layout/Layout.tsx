import React, { FC, useEffect, useRef, useState } from 'react'
import { Box } from '@mui/system'
import IcrLogo from '../../../assets/Images/logo/ICR_LOGO_1.svg'
import FooterImage from '../../../assets/Images/illustrations/Footer.svg'
import { Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import {
  setSectionA,
  setSectionB,
  setSectionC,
  setSectionD,
  setSectionE,
} from '../../../redux/Slices/pdfSlice'

interface LayoutProps {
  title?: string | number
  heading?: string
  page?: number
  children: any
  child_ref?: any
  parent_ref_value?: number
  parent_ref?: any
  marginTop?: number
  page_dynamic?: boolean
  page_index?: number
}
let instancesCount = 0
// let count = 0

const Layout: FC<LayoutProps> = ({
  title,
  heading,
  page,
  children,
  child_ref,
  parent_ref,
  parent_ref_value,
  marginTop,
  page_dynamic,
  page_index,
}) => {
  const dispatch = useAppDispatch()
  const [index, setIndex] = useState<any>(0)
  const [currentPage, setCurrentPage] = useState(0)

  const [width, setWidth] = useState<any>(0)

  const ref = useRef<any>(null)

  const indexes = [
    {
      name: 'Section A: Description of Project Activity',
      func: (val: number) => {
        dispatch(setSectionA(val))
      },
    },
    {
      name: 'Section B: Implementation of the project activity',
      func: (val: number) => {
        dispatch(setSectionB(val))
      },
    },
    {
      name: 'Section C: Description of Monitoring Activity',
      func: (val: number) => {
        dispatch(setSectionC(val))
      },
    },
    {
      name: 'Section D: Data and parameters',
      func: (val: number) => {
        dispatch(setSectionD(val))
      },
    },
    {
      name: 'Section E: Calculation of emission reductions or GHG removals by sinks',
      func: (val: number) => {
        dispatch(setSectionE(val))
      },
    },
  ]

  useEffect(() => {
    instancesCount += 1
    setIndex(instancesCount)
    return () => {
      instancesCount -= 1
      setIndex(instancesCount)
    }
  }, [])

  useEffect(() => {
    handleWindowSizeChange()

    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  const handleWindowSizeChange = () => {
    setWidth(ref?.current?.clientWidth)
  }

  const getPageIndex = () => {
    if (index) {
      const child: any = document.getElementById(
        `my_element${index - 1}`
      )?.nextElementSibling
      console.log(`my_element${index - 1}`, child?.parentElement?.children)
      const indexValue: any = child
        ? [...child.parentElement.children].indexOf(child)
        : 0
      setCurrentPage(indexValue)

      if (heading) {
        indexes?.forEach((item) => {
          if (item?.name === heading) item?.func(indexValue)
        })
      }
    }
  }

  useEffect(() => {
    getPageIndex()
  }, [index, children])

  return (
    <div
      ref={ref}
      style={{ width: '100%' }}
      id={`my_element${index}`}
      className="pdf-page"
    >
      <Box
        // ref={renderCount}
        sx={{
          size: 'A4',
          // width: width || '21cm',
          // height: width * 1.5 || '29.7cm',
          width: '793.7px',
          height: '1122.52px',
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
                {title}
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
        <Box sx={{ flexGrow: '1', py: 4, pb: 11 }}>
          <Box
            sx={{ position: 'relative', overflow: 'hidden', height: '100%' }}
          >
            <Box
              sx={{
                // border: '1px solid green',
                height: '100%',
              }}
              ref={parent_ref}
            >
              <Box
                sx={{
                  // border: '1px solid green',
                  width: '100%',
                  position: 'absolute',
                  marginTop: page_index
                    ? `-${(parent_ref_value || 0) * page_index}px`
                    : 0,
                  height: page_dynamic ? 'auto' : '100%',
                }}
                ref={child_ref}
              >
                {heading && (
                  <Typography
                    sx={{
                      pb: 3,
                      fontSize: 24,
                      fontWeight: 600,
                      color: '#006B5E',
                      px: 4,
                    }}
                  >
                    {heading}
                  </Typography>
                )}
                <Box
                  sx={{
                    px: 4,
                    height: page_dynamic ? 'auto' : '100%',
                  }}
                >
                  {children}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default Layout

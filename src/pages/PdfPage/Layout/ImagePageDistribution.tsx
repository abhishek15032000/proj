import { Box, Typography } from '@mui/material'
import React, { FC, useEffect, useRef, useState } from 'react'
import { fileUploadCalls } from '../../../api/fileUpload.api'
import Layout from './Layout'
import PageDynamic from './PageDynamic'

interface ImagePageDistributionProps {
  children?: any
  images: any
  title?: string
  imageTitle?: string
  mainTitle?: string
}

interface ShowImageProps {
  val: string
  index?: number
}

const ShowImage: FC<ShowImageProps> = ({ val, index }) => {
  const [image, setImage] = useState<any>('')

  const getImage = (val: string) => {
    if (val)
      fileUploadCalls
        .getFile(val)
        .then((res) => {
          setImage(URL.createObjectURL(res))
        })
        .catch(() => {
          // console.log('object')
        })
  }

  useEffect(() => getImage(val), [val])
  return (
    <Box sx={{ width: '100%', pb: 6, height: '100%', position: 'relative' }}>
      <img
        src={image}
        alt="val"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          objectPosition: 'top',
        }}
      />

      <Box
        sx={{
          color: '#4A635E',
          fontSize: 10,
          fontWeight: 400,
          position: 'absolute',
          textAlign: 'center',
          width: '100%',
        }}
      >
        {index + ': ' + val?.split('.')[0]}
      </Box>
    </Box>
  )
}

const ImagePageDistribution: FC<ImagePageDistributionProps> = ({
  children,
  images,
  title,
  imageTitle,
  mainTitle,
}) => {
  const [remainingPages, setRemainingPages] = useState<number>(0)
  const ref = useRef<any>(0)

  const calcRemainingPage = () => {
    const files = images
    if (files && files?.length > 1) {
      setRemainingPages(Math.ceil((files?.length - 1) / 2))
    }
  }

  useEffect(() => {
    calcRemainingPage()
  }, [{ images }])

  const content = () => {
    return (
      <>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <Box>{children}</Box>
          {images?.length > 0 && (
            <Box sx={{ flexGrow: '1' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      color: '#2B2B2B',
                      fontSize: 12,
                      fontWeight: 500,
                      mb: 1,
                    }}
                  >
                    {imageTitle}
                  </Typography>
                </Box>

                <Box sx={{ flexGrow: '1', position: 'relative' }}>
                  <Box sx={{ height: '100%' }} ref={ref}></Box>
                  <Box
                    sx={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      width: '100%',
                      height: ref?.current?.clientHeight,
                    }}
                  >
                    <ShowImage val={images[0]} index={1} />
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </>
    )
  }

  return (
    <>
      {children &&
        (images?.length > 0 ? (
          <Layout title={title} heading={mainTitle}>
            {content()}{' '}
          </Layout>
        ) : (
          <PageDynamic title={title} heading={mainTitle}>
            {content()}
          </PageDynamic>
        ))}
      {remainingPages !== 0 &&
        [...Array(remainingPages)]
          ?.map((itm, idx) => idx)
          ?.map((item, index) => {
            return (
              <Layout title={title} key={index}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <Box sx={{ height: '50%' }}>
                    {!children && (
                      <Typography
                        sx={{
                          color: '#2B2B2B',
                          fontSize: 12,
                          fontWeight: 500,
                          mb: 1,
                        }}
                      >
                        {imageTitle}
                      </Typography>
                    )}
                    <ShowImage
                      val={images[item + (children ? 1 : 0) + index]}
                      index={item + (children ? 2 : 1) + index}
                    />
                  </Box>
                  {images[item + (children ? 2 : 1) + index] && (
                    <Box sx={{ height: '50%' }}>
                      <ShowImage
                        val={images[item + (children ? 2 : 1) + index]}
                        index={item + (children ? 3 : 2) + index}
                      />
                    </Box>
                  )}
                </Box>
              </Layout>
            )
          })}
    </>
  )
}

export default ImagePageDistribution

import React, { FC, useEffect, useState } from 'react'
import { Box, Grid, Skeleton, Stack, Typography } from '@mui/material'
import './style.css'
import Arrow from '../../../assets/Images/Icons/arrow-circle.svg'
import { Images } from '../../../theme'
import { useAppSelector } from '../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { fileUploadCalls } from '../../../api/fileUpload.api'
const SliderComponent = (props: any) => {
  const onWebApp = useAppSelector(({ app }) => !app.throughIFrame, shallowEqual)
  const { projectData } = props
  const [loading, setLoading] = useState(true)
  const [slideList, setSlideList] = useState<any>([])

  useEffect(() => {
    getImages()

    //  fileUploadCalls.getFile(projectData?.banner_image[0]).then(res => setBannerImage( URL.createObjectURL(res)))
  }, [projectData])

  const getImages = async () => {
    try {
      setLoading(true)
      if (projectData?.project_image.length) {
        const arr = await Promise.all(
          projectData?.project_image?.map((item: any, index: any) => {
            return fileUploadCalls.getFile(item).then((res: any) => {
              console.log(
                '🚀 ~ file: SliderComponent.tsx ~ line 20 ~ fileUploadCalls.getFile ~ res',
                res
              )
              const image = URL.createObjectURL(res)
              console.log(
                '🚀 ~ file: SliderComponent.tsx ~ line 22 ~ fileUploadCalls.getFile ~ image',
                image
              )
              return image
            })
          })
        )
        console.log('🚀 ~ file: SliderComponent.tsx ~ line 20 ~ arr ~ arr', arr)

        setSlideList(arr)
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: SliderComponent.tsx ~ line 59 ~ getImages ~ error',
        error
      )
    } finally {
      setLoading(false)
    }
  }

  const moveSlider = (val: string) => {
    const lastList = document.getElementById('last-list')
    const secondLastList = document.getElementById('prev-list')
    const tempArray = slideList

    if (val === 'next') {
      lastList?.classList.remove('transformPrev')
      lastList?.classList.add('transformThis')
      secondLastList?.classList.add('activeNow')
      tempArray.splice(0, 0, tempArray.splice(tempArray?.length - 1, 1)[0])

      setTimeout(function () {
        lastList?.classList.remove('transformThis')
        lastList?.classList.remove('activeNow')
        setSlideList([...tempArray])
      }, 350)
    } else if (val === 'previous') {
      tempArray.splice(tempArray?.length - 1, 0, tempArray.splice(0, 1)[0])
      setSlideList([...tempArray])
      lastList?.classList.remove('transformPrev')
      lastList?.classList.remove('activeNow')
      setTimeout(function () {
        lastList?.classList.add('transformPrev')
        lastList?.classList.remove('transformThis')
        secondLastList?.classList.add('activeNow')
      }, 1)
    }
  }

  return (
    <Box
      sx={{
        // background: '#111E17',
        //  padding: '2vw 6vw',
        pt: 8,
        width: '100%'
      }}
    >
      <Typography
        sx={{ fontSize: 18, fontWeight: '400', color: 'headingColor.main' }}
      >
        Project Images
      </Typography>
      {!loading && slideList?.length ? (
        <div className="container">
          <div className="card-stack">
            <ul className="card-list">
              {slideList.length
                ? slideList.map((item: any, index: number) => {
                    return (
                      <li
                        key={index.toString()}
                        id={
                          slideList?.length === index + 1
                            ? 'last-list'
                            : slideList?.length - 1 === index + 1
                            ? 'prev-list'
                            : ''
                        }
                        className="card"
                        style={{
                          backgroundImage: `url(${item})`,
                          right: `calc(100px * (${index}))`,
                          height: `calc(100% - 15% * (${
                            slideList.length - (index + 1)
                          }))`,
                        }}
                      ></li>
                    )
                  })
                : null}
            </ul>
          </div>
          <div className="button-flex">
            <a className="buttons prev" onClick={() => moveSlider('previous')}>
              <img
                src={Arrow}
                alt="previous"
                style={{ filter: !onWebApp ? 'none' : 'contrast(0.5)' }}
              />
            </a>
            <a className="buttons next" onClick={() => moveSlider('next')}>
              <img
                src={Arrow}
                alt="next"
                style={{
                  transform: 'rotate(180deg)',
                  filter: !onWebApp ? 'none' : 'contrast(0.5)',
                }}
              />
            </a>
          </div>
        </div>
      ) : loading ? (
        <Box className="" sx={{justifyContent:'stretch', alignItems: 'center', display:'flex'}}>
          <Stack   alignItems="center" justifyContent={"center"} sx={{ width:'100%', m:3 }}>
            <Skeleton
              variant="rectangular"
              width={'100%'}
              height={'500px'}
              sx={{  borderRadius: 1, bgcolor: '#CCE8E1', }}
            />
             
          </Stack>
        </Box>
      ) : (
        'No Images added'
      )}
    </Box>
  )
}
export default SliderComponent

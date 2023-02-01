import React, { FC, useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import './style.css'
import Arrow from '../../../assets/Images/Icons/arrow-circle.svg'
import { Images } from '../../../theme'
import { useAppSelector } from '../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'

const SliderComponent = () => {
  const onWebApp = useAppSelector(({ app }) => !app.throughIFrame, shallowEqual)


  const [slideList, setSlideList] = useState([
    {
      bg: Images.ProjectDetails,
    },
    {
      bg: 'https://cdn.pixabay.com/photo/2022/01/28/18/32/leaves-6975462_960_720.png',
    },
    {
      bg: Images.ProjectDetails,
    },
  ])

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
    <Box sx={{ 
      // background: '#111E17',
    //  padding: '2vw 6vw',  
    pt:8
      }}>
      <Typography sx={{ fontSize: 18, fontWeight:'400', color: 'headingColor.main' }}>
        Project Images
      </Typography>
      <div className="container">
        <div className="card-stack">
          <ul className="card-list">
            {slideList.map((item, index) => {
              return (
                <li
                  key={index}
                  id={
                    slideList?.length === index + 1
                      ? 'last-list'
                      : slideList?.length - 1 === index + 1
                      ? 'prev-list'
                      : ''
                  }
                  className="card"
                  style={{
                    backgroundImage: `url(${item.bg})`,
                    right: `calc(100px * (${index}))`,
                    height: `calc(100% - 15% * (${
                      slideList.length - (index + 1)
                    }))`,
                  }}
                ></li>
              )
            })}
          </ul>
        </div>
        <div className="button-flex">
          <a className="buttons prev" onClick={() => moveSlider('previous')}>
            <img src={Arrow} alt="previous" style= {{filter: !onWebApp ? "none":'contrast(0.5)'}} />
          </a>
          <a className="buttons next" onClick={() => moveSlider('next')}>
            <img
              src={Arrow}
              alt="next"
              style={{ transform: 'rotate(180deg)', filter: !onWebApp ? "none":'contrast(0.5)' }}
            />
          </a>
        </div>
      </div>
    </Box>
  )
}
export default SliderComponent

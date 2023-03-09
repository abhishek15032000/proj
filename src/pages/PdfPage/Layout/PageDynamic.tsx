import { Box } from '@mui/system'
import React, { FC, useEffect, useRef, useState } from 'react'
import Layout from './Layout'

interface PageDynamicProps {
  children: any
  title?: string
  heading?: string
}

const PageDynamic: FC<PageDynamicProps> = ({ children, title, heading }) => {
  const [childHeight, setChildHeight] = useState<any>(0)
  const [parentHeight, setParentHeight] = useState<any>(0)
  const [extraPage, setExtraPage] = useState<number>(0)

  const parent_ref = useRef<any>(null)
  const child_ref = useRef<any>(null)

  useEffect(() => {
    setChildHeight(child_ref?.current?.clientHeight)
    setParentHeight(parent_ref?.current?.clientHeight)

    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [{ ...child_ref?.current }, { ...parent_ref?.current }])

  const handleWindowSizeChange = () => {
    setChildHeight(child_ref?.current?.clientHeight)
    setParentHeight(parent_ref?.current?.clientHeight)
  }

  useEffect(() => {
    if (childHeight !== 0 || parentHeight !== 0)
      if (childHeight > parentHeight)
        setExtraPage(Math.ceil(childHeight / parentHeight))
      else setExtraPage(0)
  }, [
    parentHeight,
    childHeight,
    { ...child_ref?.current },
    { ...parent_ref?.current },
  ])

  return (
    <>
      <Layout
        parent_ref={parent_ref}
        child_ref={child_ref}
        title={title}
        heading={heading}
        page_dynamic={true}
      >
        {children}
      </Layout>
      {extraPage !== 0 &&
        extraPage !== Infinity &&
        [...Array(extraPage)]?.map((item, index) => {
          if (index !== 0) {
            return (
              <Layout
                page_dynamic={true}
                title={title}
                heading={heading}
                index={index}
              >
                <Box>{children}</Box>
              </Layout>
            )
          }
        })}
    </>
  )
}

export default PageDynamic

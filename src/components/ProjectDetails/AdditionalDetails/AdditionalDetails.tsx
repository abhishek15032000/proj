import { Box, Grid, Typography } from '@mui/material'
import moment from 'moment'
import React, { FC, useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { useAppSelector } from '../../../hooks/reduxHooks'

const tags = [
  'Project type tag 1',
  'Impacted SDG 1',
  'Project type tag 2',
  'Impacted SDG 2',
  'Agritech',
]

interface AdditionalDetailsProps {
  projectDetailsData?: any,
  projectData?: any,
}
const AdditionalDetails = (props: AdditionalDetailsProps) => {
  const onWebApp = useAppSelector(({ app }) => !app.throughIFrame, shallowEqual)

  const { projectDetailsData } = props
  const [details, setDetails] = useState<any>([])
  const [cardDetails, setCardDetails] = useState<any>([])
  useEffect(() => {
    getAllDetails()
  }, [])

  const getAllDetails = () => {
    let methodologies = []
    methodologies =
      projectDetailsData?.section_a?.step4 &&
      projectDetailsData?.section_a?.step4?.methodologies.length &&
      projectDetailsData?.section_a?.step4?.methodologies.map(
        (item: any, index: number) => item?.methodology
      )
    console.log('methodologies', methodologies)
    const modifiedArrayTemp = [
      { heading: 'PROJECT TYPE', value: projectDetailsData?.type },
      {
        heading: 'REFERENCE & APPLIED METHODOLOGY',
        value: methodologies?.length <= 0 ? '-' : methodologies,
      },
      {
        heading: 'PROJECT START DATE',
        value: moment(projectDetailsData?.createdAt).format(`DD/MM/YY`),
      },
      {
        heading: 'PROJECT END DATE',
        value: moment(projectDetailsData?.end_date).format(`DD/MM/YY`),
      },
      {
        heading: 'CREDITING PERIOD',
        value: [`Start:${'DD/MM/YY'} `, `End:${'DD/MM/YY'}`],
      },
    ]
    // setDetails(modifiedArrayTemp)
    // const cardDetails = [
    //   { heading: 'TOTAL CREDITS / TOKENS AVAILABLE', value: props.projectData?.token_detail?.balance },
    //   { heading: 'CREDITS RETIRED', value: props.projectData?.token_detail?.retire },
    //   { heading: 'CO2e  SEQUESTERED [LIFETIME]', value:props.projectData?.token_detail?.lifetime },
    // ]
    // setCardDetails(cardDetails)
  }
  useEffect(()=>{
    const cardDetails = [
      { heading: 'TOTAL CREDITS / TOKENS AVAILABLE', value: props.projectData?.token_detail?.balance },
      { heading: 'CREDITS RETIRED', value: props.projectData?.token_detail?.retire },
      { heading: 'CO2e  SEQUESTERED [LIFETIME]', value:props.projectData?.token_detail?.lifetime },
    ]
    setCardDetails(cardDetails)
  },[props.projectData])
  return (
    <Box sx={{ 
      // background: '#111E17', 
      // padding: '2vw 6vw',  
      pt:8
      }}>
      <Typography sx={{ fontSize: 18, fontWeight:'400', color: 'headingColor.main' }}>
        Additional Details
      </Typography>
      <Grid container sx={{ mt: 3 }}>
        <Grid item md={9}>
          <Box>
            <Typography
              sx={{
                // mt: 2,
                fontSize: 12,
                color: 'textColor.main',
                fontWeight:'500'
              }}
            >
              Tags
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
              {tags &&
                tags.length &&
                tags.map((tag: string, index: number) => (
                  <Tag key={index} tag={tag} />
                ))}
            </Box>
            <Grid container sx={{ mt: 3 }} rowGap={'28px'}>
              {details &&
                details.length &&
                details.map((detail: any, index: number) => (
                  <Details
                    key={index}
                    heading={detail?.heading}
                    value={detail?.value}
                  />
                ))}
            </Grid>
          </Box>
        </Grid>
        {/* CreditDetails */}
        <Grid item md={3}>
          <Box
            sx={{
              py: 2,
              background:
              onWebApp ?'linear-gradient(180deg, #FFFFFF 0%, #DAF7F0 100%)':'linear-gradient(179.8deg, rgba(98, 98, 98, 0) 0.18%, #2D5F57 237.11%)',
              borderRadius: '8px',
            }}
          >
            {cardDetails &&
              cardDetails.length &&
              cardDetails.map((detail: any, index: number) => (
                <CardDetails
                  key={index}
                  heading={detail?.heading}
                  value={detail?.value}
                />
              ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AdditionalDetails

interface TagProps {
  tag: string
}
const Tag: FC<TagProps> = ({ tag }) => {
  return (
    <Box
      sx={{
        mt: 1,
        fontSize: 14,
        backgroundColor: 'chipBgColor.main',
        padding: '9px 24px',
        borderRadius: '24px',
        mr: 1,
        color: 'chipTextColor.main'
      }}
    >
      {tag}
    </Box>
  )
}

interface DetailsProps {
  heading: string
  value: string | string[]
}
const Details: FC<DetailsProps> = ({ heading, value }) => {
  return (
    <Grid item xs={10} md={4} sx={{ mt: 1 }} >
      <Box sx={{ fontSize: 14, color: 'textColor.main', mb: 1, width:'100%'}}>{heading}</Box>
      {typeof value === 'string' ? (
        <Box sx={{ fontSize: 16, color: 'textColor2.main', width:'100%', mt:1 }}>{value}</Box>
      ) : (
        value &&
        value.length &&
        value?.map((val: string, index: number) => (
          <Box key={index} sx={{ fontSize: 16 , color: 'textColor2.main',}}>
            {val}
          </Box>
        ))
      )}
    </Grid>
  )
}

interface CardDetailsProps {
  heading: string
  value: string
}
const CardDetails: FC<CardDetailsProps> = ({ heading, value }) => {
  return (
    <Box sx={{ textAlign: 'center', mt: 2 }}>
      <Box sx={{ fontSize: 10, color: 'textColor.main' }}>{heading}</Box>
      <Box sx={{ fontSize: 36, color: 'textColor3.main' }}>{value}</Box>
    </Box>
  )
}

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import moment from 'moment'
import React, { FC, useEffect, useState } from 'react'
import { fileUploadCalls } from '../../api/fileUpload.api'
import { useAppSelector } from '../../hooks/reduxHooks'
import ImagePageDistribution from './Layout/ImagePageDistribution'
import Layout from './Layout/Layout'
import MainHeading from './Layout/MainHeading'
import PageDynamic from './Layout/PageDynamic'
import SubData from './Layout/SubData'

const SectionA = () => {
  const page_title = 'Section A: Description of Project Activity'
  const data = useAppSelector(({ pdfPage }) => pdfPage.pdfData?.section_a)
  const methodologies = data?.step4?.methodologies?.map((item: any) => [
    { key: 'Selected Methodology', value: item?.methodology },
    {
      key: 'Project Type',
      value: item?.project_type?.toString()?.replace(',', ', '),
    },
    { key: 'Category', value: item?.category },
    { key: 'Version', value: item?.version },
    { key: 'Tools referred', value: item?.tools },
    {
      key: 'Applicability of Methodology',
      value: item?.applicable_methodology,
    },
    {
      key: 'Deviation form Methodology',
      value: item?.deviation_of_methodology,
    },
    {
      key: 'Other Information Relation to Methodology Application',
      value: item?.other_info,
    },
  ])

  const MethodologyComp = (index: number) => {
    return (
      <Box sx={{ mt: 2 }} key={index}>
        <Typography sx={{ color: '#006B5E', fontSize: 12, fontWeight: 600 }}>
          Methodology {index + 1}
        </Typography>
        <Box sx={{ mt: 1 }}>
          {methodologies[index]?.map((itm: any, idx: number) => {
            return (
              <Typography
                key={idx}
                sx={{ fontSize: 12, fontWeight: 500, mb: 1 }}
              >
                {itm.key}:{' '}
                <Typography
                  sx={{
                    display: 'inline',
                    fontSize: 12,
                    fontWeight: 400,
                  }}
                >
                  {itm?.value}
                </Typography>
              </Typography>
            )
          })}
        </Box>
      </Box>
    )
  }

  console.log('rm', methodologies)
  return (
    <>
      <PageDynamic title={page_title} heading={page_title}>
        <MainHeading value={'A1: Purpose & General description'} />
        <SubData title="Brief on purpose and general description of project activity">
          {data?.step1?.purpose_and_description}
        </SubData>
        <SubData title="Purpose of the project activity and the measures taken to reduce greenhouse gas emissions *">
          {data?.step1?.measure_taken_for_gas_emissions}
        </SubData>
        <SubData title="Brief description of the installed technology and equipment">
          {data?.step1?.brief_description_installed_tech}
        </SubData>
        <SubData title="Relevant dates for the project activity">
          Construction Dt:{' '}
          {data?.step1?.construction_date
            ? moment(data?.step1?.construction_date).format('DD/MM/YYYY')
            : ''}
          <br />
          Project Commisioning Dt:{' '}
          {data?.step1?.project_comissioning_date
            ? moment(data?.step1?.project_comissioning_date).format(
                'DD/MM/YYYY'
              )
            : ''}
          <br />
          {data?.step1?.operation_period}
        </SubData>
        <SubData title="Total GHG emission reductions or net anthropogenic GHG removals by sinks achieved in this monitoring period">
          {data?.step1?.total_GHG_emission}
        </SubData>
        <SubData title="Project Type and Sectoral Scope">
          {data?.step1?.project_type_and_sectoral_scope}
        </SubData>
        <SubData title="Conditions Prior to Initiation">
          {data?.step1?.conditions_prior_to_initiation}
        </SubData>
        <SubData title="Additional Information">
          {data?.step1?.additional_info}
        </SubData>
      </PageDynamic>

      <ImagePageDistribution
        imageTitle="Location of the project activity"
        images={data?.step2?.file_attach}
        title={page_title}
      >
        <>
          <MainHeading value="A2: Location" />
          <SubData title="Location of the project activity">
            Country: {data?.step2?.country} <br />
            Region / State / Province: {data?.step2?.state} <br />
            City / Town / District: {data?.step2?.city} <br />
            Landmark: {data?.step2?.landmark} <br />
            Pin code: {data?.step2?.pincode}
          </SubData>
        </>
      </ImagePageDistribution>

      <PageDynamic title={page_title}>
        <MainHeading value="A3: Parties & Project Participants " />
        <SubData title="Parties & project participants involved">
          <TableContainer
            component={Paper}
            sx={{ boxShadow: 'none', border: '1px solid #C4C7C5', mb: 5 }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ background: '#DAF7F0' }}>
                <TableRow>
                  <TableCell className="table-header-cell">
                    Party involved ((host) indicates a host Party)
                  </TableCell>
                  <TableCell className="table-header-cell">
                    Private and/or public entity(ies) project participants (as
                    applicable)
                  </TableCell>
                  <TableCell className="table-header-cell">
                    Indicate if the Party involved wishes to be considered as
                    project participant
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.step3?.party_and_project_participants.map((row: any) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell className="table-body-cell">
                      {row.party_involved?.toString().replace(',', ', ')}
                    </TableCell>
                    <TableCell className="table-body-cell">
                      {row.private_or_public_project_participant
                        ?.toString()
                        .replace(',', ', ')}
                    </TableCell>
                    <TableCell className="table-body-cell">
                      {row.indicate_party_involved}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </SubData>

        <SubData title="Host Country Attestation">
          {data?.step3?.host_country_attestation}
        </SubData>
      </PageDynamic>
      <ImagePageDistribution
        imageTitle=""
        title={page_title}
        images={data?.step3?.host_country_attestation_upload}
      />
      <ImagePageDistribution
        title={page_title}
        images={data?.step4?.methodologies[0]?.applicability_of_methodology}
      >
        <MainHeading value="A4: Reference of Applied Methodology" />
        <SubData title="The methodologies applied for the project activity under consideration are:">
          {methodologies?.map((item: any, index: number) => {
            if (index === 0) return MethodologyComp(index)
          })}
          <Box></Box>
        </SubData>
      </ImagePageDistribution>

      {methodologies?.length > 1 &&
        methodologies?.map((item: any, index: number) => {
          if (index !== 0)
            return (
              <ImagePageDistribution
                title={page_title}
                images={
                  data?.step4?.methodologies[index]
                    ?.applicability_of_methodology
                }
              >
                {MethodologyComp(index)}
              </ImagePageDistribution>
            )
        })}
      <PageDynamic title={page_title}>
        <MainHeading value="A5: Creating Period" />
        <SubData title="Renewable crediting period">
          <>
            {[
              {
                key: 'Start date of 1st creating period',
                value: data?.step5?.credit_start_period,
                date: true,
              },
              {
                key: 'Creating from',
                value: data?.step5?.credit_period?.start_date,
                date: true,
              },
              {
                key: 'Creating end',
                value: data?.step5?.credit_period?.end_date,
                date: true,
              },
              {
                key: 'Brief on creating period',
                value: data?.step5?.credit_period_description,
              },
            ].map((item, index) => {
              return (
                <Box sx={{ mt: 1 }} key={index}>
                  <Typography sx={{ fontSize: 12, fontWeight: 500, mb: 1 }}>
                    {item?.key}:{' '}
                    <Typography
                      sx={{
                        display: 'inline',
                        fontSize: 12,
                        fontWeight: 400,
                      }}
                    >
                      {item?.date
                        ? item?.value
                          ? moment(item?.value).format('DD/MM/YYYY')
                          : ''
                        : item?.value}
                    </Typography>
                  </Typography>
                </Box>
              )
            })}
          </>
        </SubData>
        <MainHeading value="A5: Safeguards" />
        <SubData title="Statutory Requirements">
          {data?.step6?.statutory_requirements}
        </SubData>
        <SubData title="Potential Negative Environmental and Socio-Economic Impacts">
          {data?.step6?.negative_environmental_and_socio_economic_impacts}
        </SubData>
        <SubData title="Consultation with Interested Parties and Communications">
          {data?.step6?.consultation}
        </SubData>
        <SubData title="Environmental Impact Assessment (EIA)">
          {data?.step6?.environmental_impact_assessment}
        </SubData>
        <SubData title="Risk assessment ">
          {data?.step6?.risk_assessment}
        </SubData>
        <SubData title="Additional Information on Risk Management">
          {data?.step6?.additional_information}
        </SubData>

        <MainHeading value="A7: Additionally" />
        <SubData title="Level 1 - ISO 14064-2 GHG Emissions Additionality">
          {data?.step7?.Level1}
        </SubData>
        <SubData title="Level 2a – Statutory Additionality ">
          {data?.step7?.Level2a}
        </SubData>
        <SubData title="Level 2b – Non-enforcement additionality ">
          {data?.step7?.Level2b}
        </SubData>
        <SubData title="Level 3 – Technology, Institutional, Common Practice Additionality">
          {data?.step7?.Level3}
        </SubData>
        <SubData title="Level 4a – Financial Additionality I">
          {data?.step7?.Level4a}
        </SubData>
        <SubData title="Level 4b – Financial Additionality II">
          {data?.step7?.Level4b}
        </SubData>
        <SubData title="Level 5 – Policy Additionality">
          {data?.step7?.Level5}
        </SubData>
      </PageDynamic>

      {/* <Layout heading="test hello">
        <></>
      </Layout> */}
    </>
  )
}

export default SectionA

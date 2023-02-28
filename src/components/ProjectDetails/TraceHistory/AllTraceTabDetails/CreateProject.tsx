import React, { FC } from 'react'
import TitleValue from './TitleValue'
import TransactionHash from './TransactionHash'
import moment from 'moment'

interface CreateProjectProps {
  theme?: any
  tabData?: any
}

const CreateProject: FC<CreateProjectProps> = (props) => {
  const { theme, tabData } = props

  return (
    <>
      {tabData?.transactionId ? (
        <TransactionHash txID={tabData?.transactionId} />
      ) : (
        ''
      )}
      <TitleValue
        title="Project Developer"
        value={tabData?.data?.name}
        theme={theme}
      />
      <TitleValue
        title="Project Name"
        value={tabData?.data?.area + ' Sq.Km.'}
        theme={theme}
      />
      <TitleValue
        title="Project Start Date"
        value={moment(tabData?.data?.start_date).format('ll')}
        theme={theme}
      />
      <TitleValue
        title="Project Duration"
        value={tabData?.data?.duration + ' Year(s)'}
        theme={theme}
      />
    </>
  )
}
export default CreateProject

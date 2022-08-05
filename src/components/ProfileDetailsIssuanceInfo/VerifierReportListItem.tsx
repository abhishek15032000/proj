// React Imports
import React, { FC, useState } from 'react'

// MUI Imports
import { Box, Button, Grid, List, ListItem, Typography } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import FinaliseSelectedVerifiersModal from '../../atoms/FinaliseSelectedVerifiers/FinaliseSelectedVerifiersModal'

// Local Imports

interface VerifierReportListItemListItemProps {
  title?: string
  status?: boolean
  place?: string
  verfierOption?: string
}

const VerifierReportListItemListItem: FC<
  VerifierReportListItemListItemProps
> = (props) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <Box
      sx={{
        display: 'flex',
        minWidth: '100%',
        paddingLeft: 3,
        backgroundColor: '#DDD',
        bordeRadius: '12px',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginY: '10px',
        paddingRight: '10px',
        paddingY: '10px',

        // flex: 1,
      }}
    >
      <List sx={{ listStyleType: 'disc', width: '40%' }}>
        <ListItem sx={{ display: 'list-item', paddingLeft: 0 }}>
          <Typography
            sx={{
              fontFamily: 'Poppins',
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: '16px',
              color: '#2B2B2B',
            }}
          >
            {props.title}
          </Typography>
        </ListItem>
      </List>

      <Typography
        sx={{
          fontFamily: 'Poppins',
          fontStyle: 'normal',
          fontWeight: '500',
          fontSize: '16px',
          color: '#2B2B2B',
          width: '10%',
        }}
      >
        {props.place}
      </Typography>

      <Box
        sx={{
          width: '25%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '20px',
            height: '20px',
            backgroundColor: props.status ? '#7ACB9F' : '#F6CA56',
            borderRadius: '10px',
            marginRight: 1,
          }}
        />
        <Typography
          sx={{
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: '16px',
            color: '#2B2B2B',
            width: '80%',
          }}
        >
          {props.status
            ? 'Verifier Confirmed'
            : 'Waiting for Verifier’s Confirmation'}
        </Typography>
      </Box>
      {props.status ? (
        <Button
          onClick={() => setShowModal(true)}
          sx={{
            width: '15%',
            backgroundColor: '#667080',
            borderRadius: '24px',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingY: '10px',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '700',
              fontSize: '12px',
              color: '#FFFFFF',
              textAlign: 'center',
            }}
          >
            {props.verfierOption}
          </Typography>
        </Button>
      ) : (
        <Typography
          sx={{
            width: '15%',
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: '14px',
            color: '#667080',
            textAlign: 'center',
          }}
        >
          {props.verfierOption}
        </Typography>
      )}
      <FinaliseSelectedVerifiersModal
        title="Finalise selected Verifiers?"
        modalVisibility={showModal}
        setModalVisibility={setShowModal}
      />
    </Box>
  )
}

export default VerifierReportListItemListItem

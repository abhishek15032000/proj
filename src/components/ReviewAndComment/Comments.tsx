import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import SendIcon from '@mui/icons-material/Send'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import SelectSections from './SelectSections'

const Comments = () => {
  return (
    <Box
      sx={{
        color: '#000',
        mb: 2,
        height: 'calc(100vh - 100px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          mt: 2,
          p: 2,
          background: '#B1CCC6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: '16px 16px 0 0',
          flex: '0 1 auto',
        }}
      >
        <Typography sx={{ fontWeight: 500 }}>Comments</Typography>
        <CloseOutlinedIcon sx={{ color: '#006B5E' }} />
      </Box>
      <SelectSections />
      <Box
        sx={{
          // height: '100%',
          background: '#fff',
          flex: '1 1 auto',
          p: 2,
        }}
      >
        <TextLeft />
        <TextRight />
      </Box>
      <Box
        sx={{
          p: 1,
          borderRadius: '0 0 16px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fff',
          flex: '0 1 auto',
        }}
      >
        <Box
          sx={{
            color: '#fff',
            background: '#006B5E',
            height: '40px',
            width: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mr: 2,
          }}
        >
          V
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: '100%',
          }}
        >
          <textarea
            style={{
              width: '100%',
              background: '#DAE5E1',
              outline: 'none',
              borderRadius: '8px',
              padding: '4px',
            }}
            rows={4}
          />
        </Box>
        <Box
          sx={{
            ml: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <SendIcon sx={{ color: '#006B5E', transform: 'rotate(-45deg)' }} />
        </Box>
      </Box>
    </Box>
  )
}

export default Comments

const TextLeft = () => {
  return (
    <Box
      sx={{
        mt: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      <Box
        sx={{
          p: 1,
          fontSize: '12px',
          maxWidth: '70%',
          background: '#EFF1EF',
          borderRadius: '16px',
        }}
      >
        Lorem ipsum dolor sit amet consectetur. Enim ultrices orci id cum vitae
        varius bibendum pharetra. Egestas.
      </Box>
      <Box
        sx={{
          color: '#fff',
          background: '#006B5E',
          height: '40px',
          width: '40px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ml: 1,
        }}
      >
        V
      </Box>
    </Box>
  )
}

const TextRight = () => {
  return (
    <Box
      sx={{
        mt: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <Box
        sx={{
          color: '#fff',
          background: '#006B5E',
          height: '40px',
          width: '40px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mr: 1,
        }}
      >
        V
      </Box>
      <Box
        sx={{
          p: 1,
          fontSize: '12px',
          maxWidth: '70%',
          background: '#EFF1EF',
          borderRadius: '16px',
        }}
      >
        Lorem ipsum dolor sit amet consectetur. Enim ultrices orci id cum vitae
        varius bibendum pharetra. Egestas.
      </Box>
    </Box>
  )
}

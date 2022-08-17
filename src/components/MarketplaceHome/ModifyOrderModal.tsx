// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Box, Button, Modal, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

// Local Imports
import LabelInput from '../../atoms/LabelInput/LabelInput'
import CCTitleValue from '../../atoms/CCTitleValue/CCTitleValue'
import TextButton from '../../atoms/TextButton/TextButton'

interface ModifyOrderModalProps {}

const ModifyOrderModal: FC<ModifyOrderModalProps> = () => {
  return (
    <Modal
      open={true}
      sx={{
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '600px',
          height: '390px',
          borderRadius: '12px',
          // border: '2px solid',
          position: 'relative',
          paddingTop: 2,
          paddingLeft: 2,
          backgroundColor: '#FFF',
        }}
      >
        <Typography sx={{ fontSize: 20, fontWeight: 500, marginLeft: 1 }}>
          Modify Order
        </Typography>

        <LabelInput
          label="Quantity"
          sx={{ marginTop: 2 }}
          textFieldSx={{ width: '90%' }}
        />

        <CCTitleValue
          title="Unit Price"
          value="144"
          sx={{ marginTop: 3, width: '60%', marginLeft: 1 }}
        />

        <CCTitleValue
          title="Total amount to be paid :"
          value="288"
          sx={{ marginTop: 3, width: '60%', marginLeft: 1 }}
        />

        <Box
          sx={{
            position: 'absolute',
            height: '80px',
            width: '100%',
            backgroundColor: '#B6B7B9',
            bottom: 0,
            right: 0,
            borderBottomLeftRadius: '12px',
            borderBottomRightRadius: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button
            sx={{
              height: '40px',
              width: '120px',
              borderRadius: '24px',
              margin: 2,
            }}
            variant="contained"
            endIcon={<DeleteIcon />}
          >
            <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
              Remove
            </Typography>
          </Button>

          <Box
            sx={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 2,
            }}
          >
            <TextButton title="Cancel" sx={{ margin: 1 }} />
            <TextButton title="Save Changes" sx={{ margin: 1 }} />
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default ModifyOrderModal

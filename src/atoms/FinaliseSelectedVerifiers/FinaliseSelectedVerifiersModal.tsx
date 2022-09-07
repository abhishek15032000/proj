import React, { FC } from 'react'
import { Box, Typography, Modal, Paper, Stack } from '@mui/material'
import CCButtonOutlined from '../CCButtonOutlined'
import CCButton from '../CCButton'

interface FinaliseSelectedVerifiersModalProps {
  title: string
  modalVisibility: boolean
  setModalVisibility: any
  updateVerifierAPI: any
}

const FinaliseSelectedVerifiersModal: FC<
  FinaliseSelectedVerifiersModalProps
> = (props: FinaliseSelectedVerifiersModalProps) => {
  return (
    <Modal
      open={props.modalVisibility}
      onClose={() => props.setModalVisibility(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(56, 142, 129, 0.4)',
      }}
    >
      <Paper
        sx={{
          px: 10,
          py: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 3,
        }}
      >
        <Box>
          <Typography
            textAlign="center"
            sx={{ fontSize: 20, fontWeight: 500, pb: 2 }}
          >
            Finalize selected Verifier?
          </Typography>
          <Box>
            <Stack
              sx={{ mt: 5 }}
              direction="row"
              justifyContent={'space-between'}
            >
              <CCButtonOutlined
                sx={{
                  minWidth: 0,
                  padding: '6px 34px',
                  borderRadius: 10,
                  mr: 3,
                }}
                onClick={() => {
                  props.setModalVisibility(false)
                }}
              >
                Cancel
              </CCButtonOutlined>
              <CCButton
                sx={{ minWidth: 0, padding: '6px 50px', borderRadius: 10 }}
                onClick={() => {
                  props.setModalVisibility(false)
                  props.updateVerifierAPI()
                }}
              >
                Yes
              </CCButton>
            </Stack>
          </Box>
        </Box>
      </Paper>
    </Modal>
  )
}

export default FinaliseSelectedVerifiersModal

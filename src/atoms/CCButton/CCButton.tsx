import React from 'react'
import Button from '@mui/material/Button'
import { CCButtonProps } from './CCButton.interface'
const CCButton: React.FC<CCButtonProps> = (props) => {
  return (
    <>
      <Button
        {...props}
        sx={{
          borderRadius: props.rounded ? 10 : 2,
          textTransform: 'none',
          backgroundColor: 'darkPrimary1.main',
          color: 'primary.light',
          '&hover': {
            color: 'primary.main',
            border: '2px solid',
            borderColor: 'darkPrimary1.main',
          },
          ...props.sx,
        }}
      >
        {props.children}
      </Button>
    </>
  )
}
export default CCButton

// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Button, Typography } from '@mui/material'

// Local Imports

interface TextButtonProps {
  sx?: any
  title?: string | number
  textStyle?: any
}

const TextButton: FC<TextButtonProps> = (props) => {
  return (
    <Button
      sx={{
        height: 50,
        width: 140,
        textTransform: 'none',
        backgroundColor: '#999',
        ...props.sx,
      }}
    >
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 600,
          color: 'white',
          ...props.textStyle,
        }}
      >
        {props.title}
      </Typography>
    </Button>
  )
}

export default TextButton

TextButton.defaultProps = {
  title: 'Button',
}

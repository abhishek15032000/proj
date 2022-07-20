import React from 'react'
import Button from '@mui/material/Button'
import { CCButtonProps } from './CCButton.interface'
const CCButton = (props: CCButtonProps) => {
    return (
        <Button {...props} sx={{ borderRadius: props.rounded ? 10 : 2 }}>
            {props.text}
        </Button>
    )
}
export default CCButton

import { StandardTextFieldProps, TextField } from '@mui/material'
import React from 'react'

const CustomTextField = (props: StandardTextFieldProps) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      label={props.label}
      {...props}
    />
  );
}

export default CustomTextField
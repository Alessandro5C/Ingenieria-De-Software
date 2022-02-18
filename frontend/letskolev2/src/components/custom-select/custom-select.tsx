import React, { useEffect } from 'react'
import { StandardTextFieldProps, TextField } from "@mui/material";
import { profileEnd } from 'console';


interface OwnDict {
    value: any;
    label: string;
}

interface OwnSelectTextFieldProps extends StandardTextFieldProps {
    selection: OwnDict[]
}

const CustomSelect = (props: OwnSelectTextFieldProps) => {
  useEffect(() => console.log(props.selection), []);

  return (
      <TextField 
        fullWidth
        select
        SelectProps = {{
            native: true,
        }}
        variant="outlined"
        {...props}
      >
        {
          props.selection.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>  
          ))
        }
      </TextField>
  )
}

export default CustomSelect
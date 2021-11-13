import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {StandardTextFieldProps} from "@material-ui/core";

interface OwnDict {
    value: any;
    label: string;
}

interface OwnSelectTextFieldProps extends StandardTextFieldProps {
    selection: OwnDict[]
}

const MultilineTextFields = (props:OwnSelectTextFieldProps) => {
    const [localValue, setLocalValue] = React.useState(props.value);
    React.useEffect(() => setLocalValue(props.value ?? ""), [props.value])

    return (
        <TextField
            fullWidth
            select
            SelectProps={{
                native: true,
            }}
            // helperText="Please select your currency"
            variant="outlined"
            {...props}
        >
            {props.selection.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </TextField>
    );
}

export default MultilineTextFields;

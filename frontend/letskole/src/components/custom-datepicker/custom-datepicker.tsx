import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {StandardTextFieldProps} from "@material-ui/core";

interface OwnDatePickerTextFieldProps extends StandardTextFieldProps {
    useNative: boolean
}

const CustomDatePicker = (props:OwnDatePickerTextFieldProps) => {
    const [localValue, setLocalValue] = React.useState(props.value);
    React.useEffect(() => setLocalValue(props.value ?? ""), [props.value])

    if (props.useNative) {
        return (
            <TextField
                fullWidth
                label={props.label}
                type="date"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
                {...props}
            />
        );
    }
    //NOT IMPLEMENTED
    // else {
    //     return (
    //         <TextField
    //             fullWidth
    //             id="date"
    //             label="Birthday"
    //             type="date"
    //             defaultValue="2017-05-24"
    //             // className={classes.textField}
    //             InputLabelProps={{
    //                 shrink: true,
    //             }}
    //             variant="outlined"
    //         />
    //     );
    // }
}

export default CustomDatePicker;

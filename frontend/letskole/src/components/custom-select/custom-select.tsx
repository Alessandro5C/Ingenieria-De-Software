import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select, {SelectProps} from '@material-ui/core/Select';
import {StandardProps} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

const CustomSelect = (props: StandardProps<SelectProps, any>) =>{
    const classes = useStyles();
    const [age, setAge] = React.useState('');

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAge(event.target.value as string);
    };

    return (
            <Select fullWidth variant="outlined" {...props}
                // labelId="demo-simple-select-outlined-label"
                // id="demo-simple-select-outlined"
                // value={age}
                // onChange={handleChange}
                // label="Age"
            >
            {/*<TextField fullWidth variant="outlined" label={props.label} {...props} />*/}
            {/*<FormControl variant="outlined" className={classes.formControl}>*/}
                <MenuItem value="">
                    <em>Soy estudiante</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
    );
};

export default CustomSelect;
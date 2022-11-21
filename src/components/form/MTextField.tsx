import * as React from 'react';
import { OutlinedInput } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
export interface IPropTextFied {
    name: string;
    [key: string]: any;
}

export default function MTextField({ name, ...other }: IPropTextFied) {
    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => {
                return <TextField {...field} fullWidth error={!!error} helperText={error?.message} {...other} />;
            }}
        />
    );
}

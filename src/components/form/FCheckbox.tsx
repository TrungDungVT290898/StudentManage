import * as React from "react";


import { Controller, useFormContext } from "react-hook-form";

function FCheckbox({ name, ...other }: any) {
    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => {
                return (
                    <input
                        {...field}
                        className={other.className}
                        error={!!error}
                        helperText={error?.message}
                        {...other}
                    />
                );
            }}
        />
    );
}

export default FCheckbox
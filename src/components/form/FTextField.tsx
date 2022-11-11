import * as React from "react";


import { Controller, useFormContext } from "react-hook-form";

export default function FTextField({ name, ...other }: any) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {

        return (
          <input
            {...field}

            error={!!error}
            {...other}
          />
        );
      }}
    />
  );
}

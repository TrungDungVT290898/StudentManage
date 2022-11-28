import * as React from 'react';

import { Controller, useFormContext } from 'react-hook-form';
export interface TextFieldProps {
  name: string,
  [key: string]: any
}
export default function FTextField({ name, ...other }: TextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return <input {...field} {...other} />;
      }}
    />
  );
}

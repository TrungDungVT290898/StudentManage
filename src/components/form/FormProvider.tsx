import { FormProvider as RHFormProvider } from "react-hook-form";
import React from 'react'
export interface FormProviderProps {
  children: any,
  onSubmit: any,
  methods: any
}
export default function FormProvider({ children, onSubmit, methods }: FormProviderProps) {
  return (
    <RHFormProvider {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </RHFormProvider>
  );
}

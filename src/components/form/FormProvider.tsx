import { FormProvider as RHFormProvider, UseFormReturn } from 'react-hook-form';
import React from 'react';
import { User } from '../../models';

export interface FormProviderProps {
  children: JSX.Element;
  onSubmit: () => Promise<void>;
  methods: UseFormReturn<User, any>;
  [key: string]: any
}
export default function FormProvider({ children, onSubmit, methods, other }: FormProviderProps) {
  return (
    <RHFormProvider {...methods}>
      <form {...other} onSubmit={onSubmit}>{children}</form>
    </RHFormProvider>
  );
}

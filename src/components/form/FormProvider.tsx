import { FormProvider as RHFormProvider, UseFormReturn } from 'react-hook-form';
import React from 'react';
import { User } from '../../features/auth/pages/LoginPage';
export interface FormProviderProps {
  children: JSX.Element;
  onSubmit: () => Promise<void>;
  methods: UseFormReturn<User, any>;
}
export default function FormProvider({ children, onSubmit, methods }: FormProviderProps) {
  return (
    <RHFormProvider {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </RHFormProvider>
  );
}

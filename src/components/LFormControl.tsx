import React from 'react';
import { FormControl, Stack } from 'native-base';

type Props = {
  label: string;
  isRequired?: boolean;
  helperText?: string;
  children: any;
};

export function LFormControl({ label, helperText, children, isRequired = false }: Props) {
  return (
    <FormControl isRequired={isRequired} mb={2}>
      <Stack>
        <FormControl.Label>{label}</FormControl.Label>
        {children}
        {helperText && <FormControl.HelperText>{helperText}</FormControl.HelperText>}
      </Stack>
    </FormControl>
  );
}

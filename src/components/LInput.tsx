import React from 'react';
import { FormControl, IInputProps, Input, Stack } from 'native-base';

type Props = {
  isRequired?: boolean;
  label: string;
  helperText?: string;
} & Pick<IInputProps, 'value' | 'onChange' | 'onChangeText' | 'focusable'>;

export function LInput({ label, helperText, isRequired = false, ...rest }: Props) {
  return (
    <FormControl isRequired={isRequired} mb={2}>
      <Stack>
        <FormControl.Label>{label}</FormControl.Label>
        <Input {...rest} />
        {helperText && <FormControl.HelperText>{helperText}</FormControl.HelperText>}
      </Stack>
    </FormControl>
  );
}

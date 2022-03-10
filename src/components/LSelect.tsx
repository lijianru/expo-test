import React from 'react';
import { FormControl, ISelectProps, Select, Stack } from 'native-base';

import { Form } from '../types/native-base-form';

type Props = Form &
  Pick<ISelectProps, 'onValueChange'> & {
    options: string[];
  };

export function LSelect({ onValueChange, options, label, helperText, isRequired = false }: Props) {
  return (
    <FormControl isRequired={isRequired} mb={2}>
      <Stack>
        <FormControl.Label>{label}</FormControl.Label>
        <Select onValueChange={onValueChange}>
          {options.map(option => (
            <Select.Item key={option} label={option} value={option} />
          ))}
        </Select>
        {helperText && <FormControl.HelperText>{helperText}</FormControl.HelperText>}
      </Stack>
    </FormControl>
  );
}

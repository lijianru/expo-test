import React from 'react';
import { Box, IBoxProps } from 'native-base';

export function LCard({ children, ...rest }: IBoxProps) {
  return (
    <Box
      rounded="md"
      borderColor="coolGray.200"
      bg="light.50"
      borderWidth="1"
      p={2}
      mb={2}
      {...rest}
    >
      {children}
    </Box>
  );
}

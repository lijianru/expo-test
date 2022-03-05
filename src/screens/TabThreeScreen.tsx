import React from 'react';
import { Box, Button, Text, useColorModeValue } from 'native-base';

import { useColorMode } from '../hooks/useColorMode';

export function TabThreeScreen() {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Box p="4" flex="1" bg={useColorModeValue('warmGray.50', 'coolGray.800')} w="100%">
      <Text fontSize="lg" display="flex" mb={20}>
        The active color mode is&nbsp;
        <Text bold fontSize="18px">
          {colorMode}
        </Text>
      </Text>
      <Button onPress={toggleColorMode}>Toggle</Button>
    </Box>
  );
}

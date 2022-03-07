import React from 'react';
import { Box, Button, Text, useColorModeValue } from 'native-base';

import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { decrement, increment } from '../slice/counterSlice';

export function ResumeScreen() {
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <Box p="4" flex="1" bg={useColorModeValue('warmGray.50', 'coolGray.800')} w="100%">
      <Text fontSize="lg" display="flex" mb={20}>
        <Text bold fontSize="18px">
          {count}
        </Text>
      </Text>
      <Button onPress={() => dispatch(increment())}>Increment value</Button>
      <Button onPress={() => dispatch(decrement())}>Decrement value</Button>
    </Box>
  );
}

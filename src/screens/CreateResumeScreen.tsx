import React from 'react';
import { Box, Text, View } from 'native-base';

import { useComponentMountAndUnmount } from '../hooks/useComponentMountAndUnmount';

export function CreateResumeScreen() {
  useComponentMountAndUnmount('CreateResumeScreen');

  return (
    <Box>
      <View>
        <Text>create resume screen</Text>
      </View>
    </Box>
  );
}

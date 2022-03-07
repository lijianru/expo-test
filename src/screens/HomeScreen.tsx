import React from 'react';
import { Center, ScrollView, useTheme, VStack } from 'native-base';

import { Collapse } from '../components/Collapse';

export function HomeScreen() {
  const { colors } = useTheme();

  return (
    <ScrollView
      _contentContainerStyle={{
        px: 4,
        mt: 4,
      }}
    >
      <Collapse title="待处理">
        <VStack flex="1">
          {Object.keys(colors.cyan).map((key, index) => {
            if (index >= 1 && index <= 20)
              return (
                <Center py="4" bg={`cyan.${key}`}>
                  {key}
                </Center>
              );
          })}
        </VStack>
      </Collapse>
      <Collapse title="我的推荐" defaultOpen={false}>
        <VStack flex="1">
          {Object.keys(colors.cyan).map((key, index) => {
            if (index >= 1 && index <= 20)
              return (
                <Center py="4" bg={`cyan.${key}`}>
                  {key}
                </Center>
              );
          })}
        </VStack>
      </Collapse>
    </ScrollView>
  );
}

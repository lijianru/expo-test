import React from 'react';
import { Center, useTheme, VStack } from 'native-base';

import { Collapse } from '../components/Collapse';
import { LScrollView } from '../components/LScrollView';
import { useComponentMountAndUnmount } from '../hooks/useComponentMountAndUnmount';

export function HomeScreen() {
  useComponentMountAndUnmount('HomeScreen');

  const { colors } = useTheme();

  return (
    <LScrollView>
      <Collapse title="待处理">
        <VStack flex="1">
          {Object.keys(colors.cyan).map((key, index) => {
            if (index >= 1 && index <= 20)
              return (
                <Center key={index} py="4" bg={`cyan.${key}`}>
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
                <Center key={index} py="4" bg={`cyan.${key}`}>
                  {key}
                </Center>
              );
          })}
        </VStack>
      </Collapse>
    </LScrollView>
  );
}

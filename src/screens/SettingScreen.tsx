import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Divider, Heading, Pressable, Text } from 'native-base';

import { LCard } from '../components/LCard';
import { LScrollView } from '../components/LScrollView';
import { useComponentMountAndUnmount } from '../hooks/useComponentMountAndUnmount';

export function SettingScreen() {
  useComponentMountAndUnmount('SettingScreen');

  const navigation = useNavigation();

  return (
    <LScrollView>
      <LCard>
        <Pressable onPress={() => navigation.navigate('InterviewProcess')}>
          <Heading>面试流程</Heading>
          <Divider mt={2} mb={2} />
          <Text>管理面试流程</Text>
        </Pressable>
      </LCard>
    </LScrollView>
  );
}

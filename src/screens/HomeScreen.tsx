import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Column, Heading, Pressable, Text } from 'native-base';

import { Collapse } from '../components/Collapse';
import { LCard } from '../components/LCard';
import { LScrollView } from '../components/LScrollView';
import { useComponentMountAndUnmount } from '../hooks/useComponentMountAndUnmount';
import { useResume } from '../services/resume';

export function HomeScreen() {
  useComponentMountAndUnmount('HomeScreen');

  const navigation = useNavigation();

  const { todoResumeList, uploadedByMeResumeList } = useResume();

  return (
    <LScrollView>
      <Collapse title="待处理">
        <Column>
          {todoResumeList.length ? (
            todoResumeList.map(({ id, username, job }) => (
              <Pressable key={id} onPress={() => navigation.navigate('ResumeDetail', { id })}>
                <LCard bg="green.50">
                  <Text>
                    {username} - {job}
                  </Text>
                </LCard>
              </Pressable>
            ))
          ) : (
            <Heading>无待处理简历！</Heading>
          )}
        </Column>
      </Collapse>
      <Collapse title="我的推荐" defaultOpen={false}>
        <Column>
          {uploadedByMeResumeList.length ? (
            uploadedByMeResumeList.map(({ id, username, job }) => (
              <Pressable key={id} onPress={() => navigation.navigate('ResumeDetail', { id })}>
                <LCard bg="green.50">
                  <Text>
                    {username} - {job}
                  </Text>
                </LCard>
              </Pressable>
            ))
          ) : (
            <Heading>无简历！</Heading>
          )}
        </Column>
      </Collapse>
    </LScrollView>
  );
}

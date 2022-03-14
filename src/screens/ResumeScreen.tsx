import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Column, Heading, Pressable, Text } from 'native-base';

import { LCard } from '../components/LCard';
import { LScrollView } from '../components/LScrollView';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { useComponentMountAndUnmount } from '../hooks/useComponentMountAndUnmount';
import { deleteResume } from '../slice/resumeSlice';

export function ResumeScreen() {
  useComponentMountAndUnmount('ResumeScreen');

  const dispatch = useAppDispatch();

  const resumeList = useAppSelector(state => state.resume.resumeList);

  return (
    <LScrollView>
      <Column>
        {resumeList.length ? (
          resumeList.map(({ id, username, job, phone }) => (
            <Pressable key={id}>
              <LCard bg="green.50" flexDirection="row" justifyContent="space-between">
                <Text>
                  {username} - {job} - {phone}
                </Text>
                <Pressable onPress={() => dispatch(deleteResume(id))}>
                  <AntDesign size={20} name="close" />
                </Pressable>
              </LCard>
            </Pressable>
          ))
        ) : (
          <Heading>无待处理简历！</Heading>
        )}
      </Column>
    </LScrollView>
  );
}

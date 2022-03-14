import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Box, Heading, Input, Pressable, Row, Text, useDisclose } from 'native-base';

import { InterviewProcessVO } from '../client/InterviewProcess/types';
import { LCard } from '../components/LCard';
import { LCreatePressable } from '../components/LCreatePressable';
import { LFormControl } from '../components/LFormControl';
import { LModal } from '../components/LModal';
import { LScrollView } from '../components/LScrollView';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { useComponentMountAndUnmount } from '../hooks/useComponentMountAndUnmount';
import { createInterviewProcess, deleteInterviewProcess } from '../slice/interviewProcessSlice';

export function InterviewProcessManagementScreen() {
  useComponentMountAndUnmount('InterviewProcessManagementScreen');

  const initInterviewProcess: InterviewProcessVO = {
    name: '',
    description: '',
  };

  const navigation = useNavigation();
  const { isOpen, onOpen, onClose } = useDisclose(false);
  const [interviewProcess, setInterviewProcess] =
    useState<InterviewProcessVO>(initInterviewProcess);
  const dispath = useAppDispatch();
  const interviewProcessList = useAppSelector(state => state.interviewProcess.interviewProcessList);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LCreatePressable onPress={onOpen} />,
    });
  }, []);

  return (
    <LScrollView>
      {interviewProcessList.map(({ id, name, description }) => {
        return (
          <LCard key={id}>
            <Row justifyContent="space-between" alignItems="center">
              <Heading size={'lg'}>{name}</Heading>
              <Pressable onPress={() => dispath(deleteInterviewProcess(id))}>
                <AntDesign size={20} name="close" />
              </Pressable>
            </Row>
            <Text>{description}</Text>
          </LCard>
        );
      })}
      {isOpen && (
        <LModal
          title="添加新的流程"
          visiable={isOpen}
          onClose={() => {
            onClose();
            setInterviewProcess({ ...initInterviewProcess });
          }}
          onSave={() => {
            if (interviewProcess.name && interviewProcess.description) {
              dispath(createInterviewProcess(interviewProcess));
              onClose();
              setInterviewProcess({ ...initInterviewProcess });
            }
          }}
        >
          <Box>
            <LFormControl label="步骤名" isRequired>
              <Input
                value={interviewProcess.name}
                onChange={e =>
                  setInterviewProcess({ ...interviewProcess, name: e.nativeEvent.text })
                }
              />
            </LFormControl>
            <LFormControl label="描述" isRequired>
              <Input
                value={interviewProcess.description}
                onChange={e =>
                  setInterviewProcess({ ...interviewProcess, description: e.nativeEvent.text })
                }
              />
            </LFormControl>
          </Box>
        </LModal>
      )}
    </LScrollView>
  );
}

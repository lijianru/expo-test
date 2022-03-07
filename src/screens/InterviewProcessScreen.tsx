import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Box, Text, useDisclose } from 'native-base';

import { InterviewProcessVO } from '../client/InterviewProcess/types';
import { LCreatePressable } from '../components/LCreatePressable';
import { LInput } from '../components/LInput';
import { LModal } from '../components/LModal';
import { LScrollView } from '../components/LScrollView';

export function InterviewProcessScreen() {
  const initInterviewProcess: InterviewProcessVO = {
    name: '',
    owner: '',
  };

  const navigation = useNavigation();
  const { isOpen, onOpen, onClose } = useDisclose(false);
  const [interviewProcess, setInterviewProcess] =
    useState<InterviewProcessVO>(initInterviewProcess);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LCreatePressable onPress={onOpen} />,
    });
  }, []);

  return (
    <LScrollView>
      <Box>
        <Text>123</Text>
      </Box>
      <LModal
        title="添加新的流程"
        visiable={isOpen}
        onClose={() => {
          setInterviewProcess({ ...initInterviewProcess });
          onClose();
        }}
        onSave={() => {
          if (interviewProcess.name && interviewProcess.owner) {
            console.log(interviewProcess);
            onClose();
          }
        }}
      >
        <Box>
          <LInput
            label="步骤名"
            isRequired
            value={interviewProcess.name}
            focusable
            onChangeText={e => setInterviewProcess({ ...interviewProcess, name: e })}
          />
          <LInput
            label="操作人"
            isRequired
            value={interviewProcess.owner}
            onChangeText={e => setInterviewProcess({ ...interviewProcess, owner: e })}
          />
        </Box>
      </LModal>
    </LScrollView>
  );
}

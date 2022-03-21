import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Box, Input, Select, Switch } from 'native-base';

import { SEX_TYPES } from '../client/Resume/enum';
import { ResumeFormVO } from '../client/Resume/types';
import { LCreatePressable } from '../components/LCreatePressable';
import { LFormControl } from '../components/LFormControl';
import { LScrollView } from '../components/LScrollView';
import { useAppSelector } from '../hooks/useAppSelector';
import { useComponentMountAndUnmount } from '../hooks/useComponentMountAndUnmount';
import { useResume } from '../services/resume';

export function CreateResumeScreen() {
  useComponentMountAndUnmount('CreateResumeScreen');

  const navigation = useNavigation();
  const { createNewResume } = useResume();
  const auth = useAppSelector(state => state.auth.auth);
  const userList = useAppSelector(state => state.user.userList);
  const [recommended, setRecommended] = useState(true);
  const [reason, setReason] = useState('');
  const [resume, setResume] = useState<ResumeFormVO>({
    username: '',
    sex: SEX_TYPES.MAN,
    phone: '',
    job: '',
    resumesUrl: '',
    createdBy: auth.id,
    createdDate: new Date().toISOString(),
    ownerIds: [],
  });

  const handleClickCreateBtn = () => {
    const completedForm = !Object.values(resume).some(val => !val) && (recommended || !!reason);
    if (completedForm) {
      createNewResume({
        ...resume,
        notRecommendReason: reason,
      });

      navigation.navigate('Root');
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LCreatePressable label="保存" onPress={handleClickCreateBtn} />,
    });
  }, [handleClickCreateBtn]);

  return (
    <LScrollView>
      <Box p={2} bg="white">
        <LFormControl label="姓名" isRequired>
          <Input
            value={resume.username}
            onChangeText={username => setResume({ ...resume, username })}
          />
        </LFormControl>

        <LFormControl label="性别" isRequired>
          {/* @ts-ignore */}
          <Select onValueChange={sex => setResume({ ...resume, sex })}>
            <Select.Item label={SEX_TYPES.MAN} value={SEX_TYPES.MAN} />
            <Select.Item label={SEX_TYPES.WOMAN} value={SEX_TYPES.WOMAN} />
          </Select>
        </LFormControl>

        <LFormControl label="电话" isRequired>
          <Input value={resume.phone} onChangeText={phone => setResume({ ...resume, phone })} />
        </LFormControl>

        <LFormControl label="应聘岗位" isRequired>
          <Input value={resume.job} onChangeText={job => setResume({ ...resume, job })} />
        </LFormControl>

        <LFormControl label="简历" isRequired>
          <Input
            value={resume.resumesUrl}
            onChangeText={resumesUrl => setResume({ ...resume, resumesUrl })}
          />
        </LFormControl>

        <LFormControl label="是否推荐？">
          <Switch value={recommended} onValueChange={val => setRecommended(val)} />
        </LFormControl>
        {recommended ? (
          <LFormControl label="简历将由谁处理？" isRequired>
            <Select
              onValueChange={id =>
                setResume({
                  ...resume,
                  ownerIds: [id],
                })
              }
            >
              {userList.map(({ id, username }) => (
                <Select.Item key={id} label={username} value={id} />
              ))}
            </Select>
          </LFormControl>
        ) : (
          <LFormControl label="不推荐原因" isRequired>
            <Input value={reason} onChangeText={val => setReason(val)} />
          </LFormControl>
        )}
      </Box>
    </LScrollView>
  );
}

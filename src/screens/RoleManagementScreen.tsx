import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Box, Checkbox, Column, Heading, Pressable, Row, Text, useDisclose } from 'native-base';

import { AUTHORITY } from '../client/Role/enums';
import { RoleVO } from '../client/Role/types';
import { LCard } from '../components/LCard';
import { LCreatePressable } from '../components/LCreatePressable';
import { LInput } from '../components/LInput';
import { LModal } from '../components/LModal';
import { LScrollView } from '../components/LScrollView';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { useComponentMountAndUnmount } from '../hooks/useComponentMountAndUnmount';
import { createRole, deleteRole } from '../slice/roleSlice';

export function RoleManagementScreen() {
  useComponentMountAndUnmount('InterviewProcessManagementScreen');

  const initRole: RoleVO = {
    name: '',
    authorities: {
      INTERVIEW_PROCESS_MANAGEMENT: false,
      ROLE_MANAGEMENT: false,
      USER_MANAGEMENT: false,
    },
  };

  const navigation = useNavigation();
  const { isOpen, onOpen, onClose } = useDisclose(false);
  const [role, setRole] = useState<RoleVO>(initRole);
  const dispath = useAppDispatch();
  const roleList = useAppSelector(state => state.role.roleList);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LCreatePressable onPress={onOpen} />,
    });
  }, []);

  return (
    <LScrollView>
      {roleList.map(({ id, name, authorities }) => {
        return (
          <LCard key={id}>
            <Row justifyContent="space-between" alignItems="center">
              <Heading size={'lg'}>{name}</Heading>
              <Pressable onPress={() => dispath(deleteRole(id))}>
                <AntDesign size={20} name="close" />
              </Pressable>
            </Row>
            <Column>
              {Object.keys(authorities).map(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                key => authorities[key] && <Text key={key}>{key}</Text>
              )}
            </Column>
          </LCard>
        );
      })}
      <LModal
        title="添加新的角色并赋予权限"
        visiable={isOpen}
        onClose={() => {
          onClose();
          setRole({ ...initRole });
        }}
        onSave={() => {
          if (role.name && role.authorities) {
            dispath(createRole(role));
            onClose();
            setRole({ ...initRole });
          }
        }}
      >
        <Box>
          <LInput
            label="角色名"
            isRequired
            value={role.name}
            focusable
            onChange={e => setRole({ ...role, name: e.nativeEvent.text })}
          />
          <Column>
            <Checkbox
              value={AUTHORITY.INTERVIEW_PROCESS_MANAGEMENT}
              onChange={e => {
                setRole({
                  ...role,
                  authorities: {
                    ...role.authorities,
                    [AUTHORITY.INTERVIEW_PROCESS_MANAGEMENT]: e,
                  },
                });
              }}
            >
              {AUTHORITY.INTERVIEW_PROCESS_MANAGEMENT}
            </Checkbox>
            <Checkbox
              value={AUTHORITY.ROLE_MANAGEMENT}
              onChange={e =>
                setRole({
                  ...role,
                  authorities: {
                    ...role.authorities,
                    [AUTHORITY.ROLE_MANAGEMENT]: e,
                  },
                })
              }
            >
              {AUTHORITY.ROLE_MANAGEMENT}
            </Checkbox>
            <Checkbox
              value={AUTHORITY.USER_MANAGEMENT}
              onChange={e =>
                setRole({
                  ...role,
                  authorities: {
                    ...role.authorities,
                    [AUTHORITY.USER_MANAGEMENT]: e,
                  },
                })
              }
            >
              {AUTHORITY.USER_MANAGEMENT}
            </Checkbox>
          </Column>
        </Box>
      </LModal>
    </LScrollView>
  );
}

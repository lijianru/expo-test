import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Box, Column, Heading, Pressable, Row, Switch, Text, useDisclose } from 'native-base';

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
      PROCESS_MANAGEMENT: false,
      ROLE_MANAGEMENT: false,
      USER_MANAGEMENT: false,
    },
  };

  const navigation = useNavigation();
  const { isOpen, onOpen, onClose } = useDisclose(false);
  const [role, setRole] = useState<RoleVO>({
    ...initRole,
    authorities: { ...initRole.authorities },
  });
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
          setRole({
            ...initRole,
            authorities: { ...initRole.authorities },
          });
        }}
        onSave={() => {
          if (role.name && role.authorities) {
            dispath(createRole(role));
            onClose();
            setRole({
              ...initRole,
              authorities: { ...initRole.authorities },
            });
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
            <Heading size="sm">权限：</Heading>
            {Object.keys(AUTHORITY).map(key => (
              <Row key={key} justifyContent="space-between" alignItems="center">
                {/* @ts-ignore */}
                <Text>{AUTHORITY[key]}</Text>
                <Switch
                  size="sm"
                  // @ts-ignore
                  value={role.authorities[key]}
                  onValueChange={e =>
                    setRole({
                      ...role,
                      authorities: { ...role.authorities, [key]: e },
                    })
                  }
                />
              </Row>
            ))}
          </Column>
        </Box>
      </LModal>
    </LScrollView>
  );
}

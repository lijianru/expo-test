import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  Box,
  Column,
  Heading,
  Input,
  Pressable,
  Row,
  Switch,
  Text,
  useDisclose,
} from 'native-base';

import { AUTHORITY } from '../client/Role/enums';
import { RoleFormVO } from '../client/Role/types';
import { LCard } from '../components/LCard';
import { LCreatePressable } from '../components/LCreatePressable';
import { LFormControl } from '../components/LFormControl';
import { LModal } from '../components/LModal';
import { LScrollView } from '../components/LScrollView';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { useComponentMountAndUnmount } from '../hooks/useComponentMountAndUnmount';
import { createRole, deleteRole } from '../slice/roleSlice';

export function RoleManagementScreen() {
  useComponentMountAndUnmount('InterviewProcessManagementScreen');

  const initRole: RoleFormVO = {
    name: '',
    authorities: {
      PROCESS_MANAGEMENT: false,
      ROLE_MANAGEMENT: false,
      USER_MANAGEMENT: false,
    },
  };

  const navigation = useNavigation();
  const { isOpen, onOpen, onClose } = useDisclose(false);
  const [role, setRole] = useState<RoleFormVO>({
    ...initRole,
  });
  const dispatch = useAppDispatch();
  const roleList = useAppSelector(state => state.role.roleList);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <LCreatePressable
          onPress={() => {
            onOpen();
          }}
        />
      ),
    });
  }, []);

  return (
    <LScrollView>
      {roleList.map(({ id, name, authorities }) => {
        return (
          <LCard key={id}>
            <Row justifyContent="space-between" alignItems="center">
              <Heading size={'lg'}>{name}</Heading>
              <Pressable onPress={() => dispatch(deleteRole(id))}>
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
      {isOpen && (
        <LModal
          title="添加新的角色并赋予权限"
          visible={isOpen}
          onClose={() => {
            onClose();
            setRole({
              ...initRole,
            });
          }}
          onSave={() => {
            if (role.name && Object.values(role.authorities).some(val => val)) {
              dispatch(createRole(role));
              onClose();
              setRole({
                ...initRole,
              });
            }
          }}
        >
          <Box>
            <LFormControl label="角色名" isRequired>
              <Input
                value={role.name}
                onChange={e => setRole({ ...role, name: e.nativeEvent.text })}
              />
            </LFormControl>
            <LFormControl isRequired label="权限">
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
            </LFormControl>
          </Box>
        </LModal>
      )}
    </LScrollView>
  );
}

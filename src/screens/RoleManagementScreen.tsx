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

import { AUTHORITY } from '../client/Role/constants';
import { RoleFormVO } from '../client/Role/types';
import { LCard } from '../components/LCard';
import { LCreatePressable } from '../components/LCreatePressable';
import { LFormControl } from '../components/LFormControl';
import { LModal } from '../components/LModal';
import { LScrollView } from '../components/LScrollView';
import { useAppSelector } from '../hooks/useAppSelector';
import { useComponentMountAndUnmount } from '../hooks/useComponentMountAndUnmount';
import { useRole } from '../services/role';

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
  const roleList = useAppSelector(state => state.role.roleList);
  const { handleCreateRole, handleDeleteRole } = useRole();

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
              <Pressable onPress={() => handleDeleteRole(id)}>
                <AntDesign size={20} name="close" />
              </Pressable>
            </Row>
            <Column>
              {authorities.map(key => (
                <Text key={key}>{key}</Text>
              ))}
            </Column>
          </LCard>
        );
      })}
      {isOpen && (
        <LModal
          title="?????????????????????????????????"
          visible={isOpen}
          onClose={() => {
            onClose();
            setRole({
              ...initRole,
            });
          }}
          onSave={() => {
            if (role.name) {
              handleCreateRole(role);
              onClose();
              setRole({
                ...initRole,
              });
            }
          }}
        >
          <Box>
            <LFormControl label="?????????" isRequired>
              <Input
                value={role.name}
                onChange={e => setRole({ ...role, name: e.nativeEvent.text })}
              />
            </LFormControl>
            <LFormControl isRequired label="??????">
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

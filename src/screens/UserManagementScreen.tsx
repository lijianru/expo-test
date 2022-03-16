import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Box, Heading, Input, Pressable, Row, Select, Text, useDisclose } from 'native-base';

import { UserVO } from '../client/User/types';
import { LCard } from '../components/LCard';
import { LCreatePressable } from '../components/LCreatePressable';
import { LFormControl } from '../components/LFormControl';
import { LModal } from '../components/LModal';
import { LScrollView } from '../components/LScrollView';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { useComponentMountAndUnmount } from '../hooks/useComponentMountAndUnmount';
import { createUser, deleteUser } from '../slice/userSlice';

export function UserManagementScreen() {
  useComponentMountAndUnmount('UserManagementScreen');

  const initUser: UserVO = {
    username: '',
    password: '',
    roleId: '',
  };

  const navigation = useNavigation();
  const { isOpen, onOpen, onClose } = useDisclose(false);
  const [user, setUser] = useState<UserVO>(initUser);
  const dispatch = useAppDispatch();
  const userList = useAppSelector(state => state.user.userList);
  const roleList = useAppSelector(state => state.role.roleList);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LCreatePressable onPress={onOpen} />,
    });
  }, []);

  return (
    <LScrollView>
      {userList.map(({ id, username, roleId }) => {
        const roleInfo = roleList.find(({ id }) => id === roleId);

        return (
          <LCard key={id}>
            <Row justifyContent="space-between" alignItems="center">
              <Heading size={'lg'}>{username}</Heading>
              <Pressable onPress={() => dispatch(deleteUser(id))}>
                <AntDesign size={20} name="close" />
              </Pressable>
            </Row>
            <Text>{roleInfo?.name}</Text>
          </LCard>
        );
      })}
      {isOpen && (
        <LModal
          title="添加新用户"
          visible={isOpen}
          onClose={() => {
            onClose();
            setUser({ ...initUser });
          }}
          onSave={() => {
            if (user.username && user.password && user.roleId) {
              dispatch(createUser(user));
              onClose();
              setUser({ ...initUser });
            }
          }}
        >
          <Box>
            <LFormControl label="用户名" isRequired>
              <Input
                value={user.username}
                onChangeText={username => setUser({ ...user, username })}
              />
            </LFormControl>
            <LFormControl label="密码" isRequired>
              <Input
                value={user.password}
                type="password"
                onChangeText={password => setUser({ ...user, password })}
              />
            </LFormControl>
            <LFormControl label="角色" isRequired>
              <Select onValueChange={roleId => setUser({ ...user, roleId })}>
                {roleList.map(({ name, id }) => (
                  <Select.Item key={name} label={name} value={id} />
                ))}
              </Select>
            </LFormControl>
          </Box>
        </LModal>
      )}
    </LScrollView>
  );
}

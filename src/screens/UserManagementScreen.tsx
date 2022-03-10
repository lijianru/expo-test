import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  Box,
  FormControl,
  Heading,
  Pressable,
  Row,
  Select,
  Stack,
  Text,
  useDisclose,
} from 'native-base';

import { UserVO } from '../client/User/types';
import { LCard } from '../components/LCard';
import { LCreatePressable } from '../components/LCreatePressable';
import { LInput } from '../components/LInput';
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
    role: '',
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
      {userList.map(({ id, username, role }) => {
        return (
          <LCard key={id}>
            <Row justifyContent="space-between" alignItems="center">
              <Heading size={'lg'}>{username}</Heading>
              <Pressable onPress={() => dispatch(deleteUser(id))}>
                <AntDesign size={20} name="close" />
              </Pressable>
            </Row>
            <Text>{role}</Text>
          </LCard>
        );
      })}
      {isOpen && (
        <LModal
          title="添加新用户"
          visiable={isOpen}
          onClose={() => {
            onClose();
            setUser({ ...initUser });
          }}
          onSave={() => {
            if (user.username && user.password && user.role) {
              dispatch(createUser(user));
              onClose();
              setUser({ ...initUser });
            }
          }}
        >
          <Box>
            <LInput
              label="用户名"
              isRequired
              value={user.username}
              focusable
              onChangeText={username => setUser({ ...user, username })}
            />
            <LInput
              label="密码"
              isRequired
              value={user.password}
              focusable
              type="password"
              onChangeText={password => setUser({ ...user, password })}
            />
            <FormControl isRequired mb={2}>
              <Stack>
                <FormControl.Label>角色</FormControl.Label>
                <Select onValueChange={role => setUser({ ...user, role })}>
                  {roleList.map(({ name }) => (
                    <Select.Item key={name} label={name} value={name} />
                  ))}
                </Select>
              </Stack>
            </FormControl>
          </Box>
        </LModal>
      )}
    </LScrollView>
  );
}

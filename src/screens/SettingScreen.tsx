import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Divider, Heading, Pressable, Text } from 'native-base';

import { AUTHORITY } from '../client/Role/constants';
import { LCard } from '../components/LCard';
import { LScrollView } from '../components/LScrollView';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAuthority } from '../hooks/useAuthority';
import { useComponentMountAndUnmount } from '../hooks/useComponentMountAndUnmount';
import { logout } from '../slice/auth';

export function SettingScreen() {
  useComponentMountAndUnmount('SettingScreen');

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const enableRole = useAuthority([AUTHORITY.ROLE_MANAGEMENT]);
  const enableUser = useAuthority([AUTHORITY.USER_MANAGEMENT]);
  const enableProcess = useAuthority([AUTHORITY.PROCESS_MANAGEMENT]);

  return (
    <LScrollView>
      {enableRole && (
        <LCard>
          <Pressable onPress={() => navigation.navigate('RoleManagement')}>
            <Heading>角色权限管理</Heading>
            <Divider mt={2} mb={2} />
            <Text>管理角色的权限</Text>
          </Pressable>
        </LCard>
      )}
      {enableUser && (
        <LCard>
          <Pressable onPress={() => navigation.navigate('UserManagement')}>
            <Heading>用户管理</Heading>
            <Divider mt={2} mb={2} />
            <Text>管理用户</Text>
          </Pressable>
        </LCard>
      )}
      {enableProcess && (
        <LCard>
          <Pressable onPress={() => navigation.navigate('InterviewProcessManagement')}>
            <Heading>面试流程管理</Heading>
            <Divider mt={2} mb={2} />
            <Text>管理面试流程</Text>
          </Pressable>
        </LCard>
      )}
      <Button onPress={() => dispatch(logout())}>登出</Button>
    </LScrollView>
  );
}

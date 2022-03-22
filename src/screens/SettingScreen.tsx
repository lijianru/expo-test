import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Divider, Heading, Pressable, Text } from 'native-base';

import { LCard } from '../components/LCard';
import { LScrollView } from '../components/LScrollView';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useComponentMountAndUnmount } from '../hooks/useComponentMountAndUnmount';
import { logout } from '../slice/auth';

export function SettingScreen() {
  useComponentMountAndUnmount('SettingScreen');

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  return (
    <LScrollView>
      <LCard>
        <Pressable onPress={() => navigation.navigate('RoleManagement')}>
          <Heading>角色权限管理</Heading>
          <Divider mt={2} mb={2} />
          <Text>管理角色的权限</Text>
        </Pressable>
      </LCard>
      <LCard>
        <Pressable onPress={() => navigation.navigate('UserManagement')}>
          <Heading>用户管理</Heading>
          <Divider mt={2} mb={2} />
          <Text>管理用户</Text>
        </Pressable>
      </LCard>
      <LCard>
        <Pressable onPress={() => navigation.navigate('InterviewProcessManagement')}>
          <Heading>面试流程管理</Heading>
          <Divider mt={2} mb={2} />
          <Text>管理面试流程</Text>
        </Pressable>
      </LCard>
      <Button onPress={() => dispatch(logout())}>登出</Button>
    </LScrollView>
  );
}

import React, { Fragment } from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  Theme as ColorMode,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAppSelector } from '../hooks/useAppSelector';
// import { useTheme } from 'native-base';
import { useColorMode } from '../hooks/useColorMode';
import { CreateResumeScreen } from '../screens/CreateResumeScreen';
import { InterviewProcessManagementScreen } from '../screens/InterviewProcessManagementScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { NotFoundScreen } from '../screens/NotFoundScreen';
import { ResumeDetailScreen } from '../screens/ResumeDetailScreen';
import { RoleManagementScreen } from '../screens/RoleManagementScreen';
import { UserManagementScreen } from '../screens/UserManagementScreen';
import { RootStackParamList } from '../types/navigation';
import { BottomTabNavigator } from './BottomTabNavigator';
import { linkingConfiguration } from './LinkingConfiguration';

export function Navigation() {
  const { colorMode } = useColorMode();
  // const { colors } = useTheme();

  const DarkColorMode: ColorMode = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      // primary: colors.primary[400],
      // background: colors.light[50],
      // card: colors.light[100],
      // text: colors.light[50],
      // border: colors.light[50],
      // notification: colors.light[50],
    },
  };

  const LightColorMode: ColorMode = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      // primary: colors.primary[400],
      // background: colors.light[200],
      // card: colors.light[700],
      // text: colors.light[50],
      // border: colors.light[50],
      // notification: colors.light[50],
    },
  };

  return (
    <NavigationContainer
      linking={linkingConfiguration}
      theme={colorMode === 'dark' ? DarkColorMode : LightColorMode}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * root stack navigator?????????????????????????????????????????????Modal???
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const auth = useAppSelector(state => state.auth.auth);
  const store = useAppSelector(state => state);

  console.log('store', store);

  return (
    <Stack.Navigator initialRouteName="Root">
      {auth.username ? (
        <Fragment>
          <Stack.Screen
            name="Root"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateResume"
            component={CreateResumeScreen}
            options={{ title: '?????????????????????', headerBackTitle: '??????' }}
          />
          <Stack.Screen
            name="InterviewProcessManagement"
            component={InterviewProcessManagementScreen}
            options={{
              title: '??????????????????',
              headerBackTitle: '??????',
            }}
          />
          <Stack.Screen
            name="RoleManagement"
            component={RoleManagementScreen}
            options={{
              title: '??????????????????',
              headerBackTitle: '??????',
            }}
          />
          <Stack.Screen
            name="UserManagement"
            component={UserManagementScreen}
            options={{
              title: '????????????',
              headerBackTitle: '??????',
            }}
          />
          <Stack.Screen
            name="ResumeDetail"
            component={ResumeDetailScreen}
            options={{
              title: '????????????',
              headerBackTitle: '??????',
            }}
          />
        </Fragment>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: '??????' }} />
      )}
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

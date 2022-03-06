import React from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  Theme as ColorMode,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import { useTheme } from 'native-base';
import { useColorMode } from '../hooks/useColorMode';
import { NotFoundScreen } from '../screens/NotFoundScreen';
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
 * root stack navigator通常用于在所有其他内容之上显示Modal。
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Root">
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

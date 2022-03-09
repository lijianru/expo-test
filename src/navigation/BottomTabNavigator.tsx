import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'native-base';

import { LCreatePressable } from '../components/LCreatePressable';
import { useColorMode } from '../hooks/useColorMode';
import { HomeScreen } from '../screens/HomeScreen';
import { ResumeScreen } from '../screens/ResumeScreen';
import { SettingScreen } from '../screens/SettingScreen';
import { RootTabParamList } from '../types/navigation';

/**
 * 底部tab navigator在显示屏底部显示tab按钮以切换屏幕。
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

export function BottomTabNavigator() {
  const { colorMode } = useColorMode();
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      // 为它包裹的screen传递相同的props
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors[colorMode][900],
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={() => ({
          title: '主页',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <LCreatePressable onPress={() => navigation.navigate('CreateResume')} />
          ),
        })}
      />
      <BottomTab.Screen
        name="Resume"
        component={ResumeScreen}
        options={{
          title: '简历库',
          tabBarIcon: ({ color }) => <TabBarIcon name="id-card" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          title: '设置',
          tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

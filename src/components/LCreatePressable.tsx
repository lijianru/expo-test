import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, Row, Text, useTheme, View } from 'native-base';

type Props = {
  label?: string;
  onPress?: () => void;
};

export function LCreatePressable({ onPress, label = '创建' }: Props) {
  const { colors } = useTheme();

  return (
    <Pressable mr={2} onPress={onPress}>
      <Row alignItems={'center'}>
        <Ionicons size={30} style={{ color: colors.light[900] }} name="create" />
        <View>
          <Text color={'light.900'}>{label}</Text>
        </View>
      </Row>
    </Pressable>
  );
}

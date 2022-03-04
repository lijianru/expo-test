import React from 'react';
import { Text } from 'native-base';

export function MonoText(props: any) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}

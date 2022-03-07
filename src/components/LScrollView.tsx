import React from 'react';
import { IScrollViewProps, ScrollView } from 'native-base';

export function LScrollView({ children, ...rest }: IScrollViewProps) {
  return (
    <ScrollView
      _contentContainerStyle={{
        px: 4,
        mt: 4,
      }}
      {...rest}
    >
      {children}
    </ScrollView>
  );
}

import React, { ReactElement } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Box, Divider, Heading, Pressable, Row, useDisclose } from 'native-base';

type Props = {
  title: string;
  children: ReactElement<any>;
  defaultOpen?: boolean;
};

export function Collapse({ title, children, defaultOpen = true }: Props) {
  const { isOpen, onToggle } = useDisclose(defaultOpen);

  return (
    <Box rounded="md" borderColor="coolGray.200" bg="light.50" borderWidth="1" p={2} mb={2}>
      <Row mt="3" mb="4" alignItems="center" justifyContent="space-between">
        <Heading fontSize="xl">{title}</Heading>
        <Pressable onPress={() => onToggle()}>
          {!isOpen ? <AntDesign name="up" size={26} /> : <AntDesign name="down" size={26} />}
        </Pressable>
      </Row>
      {isOpen && <Divider h="1px" mt={1} mb={1} />}
      {isOpen && children}
    </Box>
  );
}

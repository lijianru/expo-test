import React, { useState } from 'react';
import { Box, Button, Input } from 'native-base';

import { LCard } from '../components/LCard';
import { LFormControl } from '../components/LFormControl';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { login } from '../slice/auth';

export function LoginScreen() {
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      dispatch(login({ username, password }));
    }
  };

  return (
    <Box m={4} mt={12} textAlign="center">
      <LCard p={4}>
        <LFormControl label="用户名" isRequired>
          <Input value={username} onChangeText={val => setUsername(val)} />
        </LFormControl>
        <LFormControl label="密码" isRequired>
          <Input value={password} onChangeText={val => setPassword(val)} />
        </LFormControl>
        <Button onPress={handleLogin}>登陆</Button>
      </LCard>
    </Box>
  );
}

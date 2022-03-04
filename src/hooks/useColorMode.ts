import { useColorMode as useNBColorMode } from 'native-base';

export function useColorMode() {
  const { colorMode, ...rest } = useNBColorMode();

  return {
    ...rest,
    colorMode: colorMode ?? 'light',
  };
}

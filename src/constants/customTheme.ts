import { extendTheme } from 'native-base';

// Define the config
const config = {
  // 默认和系统保持一致
  useSystemColorMode: true,
};

export const customTheme = extendTheme({ config });

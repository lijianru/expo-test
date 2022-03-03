import { ColorSchemeName, useColorScheme as _useColorScheme } from 'react-native';

// useColorScheme 值始终为浅色或深色，但内置
// type 表明它可以为空。 这在实践中不会发生，所以这
// 使它更容易使用。
export function useColorScheme(): NonNullable<ColorSchemeName> {
  return _useColorScheme() as NonNullable<ColorSchemeName>;
}

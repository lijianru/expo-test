import { useEffect } from 'react';

export function useComponentMountAndUnmount(name: string) {
  useEffect(() => {
    console.log(`==========${name}组件挂载`);

    return () => console.log(`==========${name}组件卸载`);
  }, []);
}

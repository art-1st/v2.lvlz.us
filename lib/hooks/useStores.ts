import React from 'react';
import { MobXProviderContext } from 'mobx-react';

const useStores = <T extends Record<string, any>>() => {
  return React.useContext(MobXProviderContext) as T;
};

export default useStores;

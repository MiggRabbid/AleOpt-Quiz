'use client';

import { store } from '@/store';
import { FC } from 'react';
import { Provider } from 'react-redux';

interface IStoreProviderProps {
  children: React.ReactNode;
}

const StoreProvider: FC<IStoreProviderProps> = (props) => {
  const { children } = props;
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;

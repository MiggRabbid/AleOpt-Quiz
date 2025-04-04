import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions, AppDispatch } from '@/store';

export const useAppActions = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useMemo(() => bindActionCreators(actions, dispatch), [dispatch]);
};

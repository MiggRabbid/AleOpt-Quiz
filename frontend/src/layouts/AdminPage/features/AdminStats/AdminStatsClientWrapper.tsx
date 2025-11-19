'use client';
// Библиотеки
import React, { useLayoutEffect, useState } from 'react';
import { Box } from '@mui/material';
// Логика
import { useAppActions } from '@/hooks';
// Компоненты
import { UsersList } from '@/features/UsersList';
import { QuestionList } from '@/features/QuestionList';
import { Header } from './components/Header';
// Типизация
import { TypeStatsTab } from '../../types/AdminStats';
import { IAdminStatsProps } from './AdminStats.types';

const AdminStatsClientWrapper = (props: IAdminStatsProps) => {
  const { users, questions } = props;

  const [activeTab, setActiveTab] = useState<TypeStatsTab>(TypeStatsTab.users);

  const { setQuizStateField } = useAppActions();

  useLayoutEffect(() => {
    if (!!users) {
      setQuizStateField({
        field: 'users',
        data: users,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  useLayoutEffect(() => {
    if (!!questions) {
      setQuizStateField({
        field: 'questions',
        data: questions,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  return (
    <>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <Box
        id="AdminStatsClientWrapper"
        className="h-full w-full! overflow-y-auto!"
        sx={{
          height: 'calc(100% - 40px - 24px - 1px)',
        }}
      >
        <Box className="mx-auto! flex h-full! w-full max-w-7xl flex-col gap-2 px-4!">
          {activeTab === TypeStatsTab.users && <UsersList />}
          {activeTab === TypeStatsTab.questions && <QuestionList />}
        </Box>
      </Box>
    </>
  );
};

export default AdminStatsClientWrapper;

'use client';
// Библиотеки
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
// Логика
import { routes } from '@/app/_config/routes';
// Компоненты
import { BtmMain } from '@/components/ui/btns/BtnMain/BtmMain';

const BtnStartQuiz = () => {
  const router = useRouter();

  const handelClickBtn = () => {
    console.log('----- handelClickBtn');
    router.push(routes.quiz);
  };

  return (
    <Box className="flex grow flex-col justify-end">
      <BtmMain btnText="Начать тест" btnClick={handelClickBtn} fullWidth />
    </Box>
  );
};

export { BtnStartQuiz };

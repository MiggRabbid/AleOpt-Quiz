// Библиотеки
import { Box } from '@mui/material';
// Логика
import {
  LocalKeyMap,
  useAppActions,
  useAppSelector,
  useLocalStorage,
  useNavigate,
} from '@app/hooks';
import { getQuizStateField } from '@app/selectors';
import { routes } from '@/app/router';
// Компоненты
import { BtnMain } from '@/shared/ui/btns';

const BtnEndQuiz = () => {
  const { navigateTo } = useNavigate();
  const { delLocalData } = useLocalStorage();
  const { clearAllState } = useAppActions();

  const isStarted = useAppSelector(getQuizStateField('isStarted'));
  const allQuestionsCompleted = useAppSelector(
    getQuizStateField('allQuestionsCompleted'),
  );

  const clearQuizState = () => {
    clearAllState();
    delLocalData<LocalKeyMap.TIMER>({ key: LocalKeyMap.TIMER });
    delLocalData<LocalKeyMap.RESULT>({ key: LocalKeyMap.RESULT });
  };

  const handelClickBtn = () => {
    navigateTo({ to: routes.main });
    clearQuizState();
  };

  return (
    <Box className="flex flex-col justify-end">
      {allQuestionsCompleted && (
        <BtnMain btnText="Сохранить результат?" btnClick={handelClickBtn} fullWidth />
      )}

      {isStarted && !allQuestionsCompleted && (
        <BtnMain
          btnText="Закончить попытку?"
          btnClick={handelClickBtn}
          fullWidth
          color="warning"
        />
      )}
    </Box>
  );
};

export { BtnEndQuiz };

'use client';
// Библиотеки
import { useLayoutEffect } from 'react';
import { Box, Divider } from '@mui/material';
// Логика
import { useAppSelector, useAuthContext } from '@app/hooks';
import { getGlobalStateField } from '@app/selectors';
import { getNewQuestionId } from '@/shared/lib';
import { useQuestionForm } from './hooks/useForm';
// Компоненты
import { BtnGroup, CustomMultilineInput, CustomSelect } from '@/shared/ui';
// Типизация
import type { SelectChangeEvent } from '@mui/material';
import { answersKeys, TTypeModal } from '@/app/types';
import type { typeAnswersKeys } from '@/app/types';
import type { TCustomSelectItems } from '@/shared/ui';
import { useQuery } from '@tanstack/react-query';
import { useGetAllQuestions } from '@/app/api/hooks';

interface IQuestionEditorProps {
  clickOnClose: () => void;
}

const answerItems: TCustomSelectItems = answersKeys.map((item) => ({
  value: item,
  text: `Ответ ${item.toUpperCase()}`,
}));

const QuestionEditor = (props: IQuestionEditorProps) => {
  const { isAuth, user } = useAuthContext();
  const { clickOnClose } = props;

  const { data: questions } = useQuery({
    ...useGetAllQuestions(),
    enabled: isAuth && !!user?.username,
  });

  const questionEditorModal = useAppSelector(getGlobalStateField('questionEditorType'));
  const editableQuestion = useAppSelector(getGlobalStateField('editableQuestion'));

  const isNewQuestion = !editableQuestion && questionEditorModal === TTypeModal.new;

  const questionId = !!editableQuestion
    ? editableQuestion.id
    : getNewQuestionId(questions);

  const {
    savingAvailable,
    errors,
    handleSubmit,
    isSubmitting,
    onSubmit,
    register,
    setValue,
    watch,
  } = useQuestionForm({ isNewQuestion, questionId });

  useLayoutEffect(() => {
    if (editableQuestion) {
      setValue('question', editableQuestion.question);

      const correctAnswerId = editableQuestion.correctAnswerId as typeAnswersKeys;
      setValue('correctAnswer', correctAnswerId);

      editableQuestion.answers.forEach((answer) => {
        const answerId = answer.id as typeAnswersKeys;
        setValue(answerId, answer.answer);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box className="flex h-fit max-h-screen! w-fit flex-col gap-0 overflow-y-auto p-6">
      <Box className="flex h-fit w-full flex-col gap-5">
        <h4 className="text-3xl font-bold">
          {isNewQuestion ? 'Создание вопроса' : 'Редактирование вопроса'}
        </h4>
        <Divider />
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 flex! h-fit w-fit flex-col! flex-wrap! items-start justify-center"
      >
        <Box className="flex! h-fit w-fit flex-row! flex-wrap! items-start justify-center gap-x-5 gap-y-2">
          <Box className="min-h-fit w-100 grow-1 pb-6">
            <CustomMultilineInput
              rows={16}
              multiline
              label="Вопрос"
              register={register('question')}
              error={!!errors.question}
              helperText={errors.question?.message}
            />
            <CustomSelect
              label="Верный ответ"
              items={answerItems}
              value={watch('correctAnswer') ?? ''}
              onChange={(event: SelectChangeEvent) => {
                const value = event.target.value as typeAnswersKeys;
                register('correctAnswer').onChange({
                  target: { name: 'correctAnswer', value },
                  type: 'change',
                } as any);
              }}
              error={!!errors.correctAnswer}
            />
          </Box>
          <Box className="min-h-fit w-150 grow-1">
            <CustomMultilineInput
              rows={3}
              multiline
              label="Ответ A"
              register={register('a')}
              error={!!errors.a}
              helperText={errors.a?.message}
            />
            <CustomMultilineInput
              rows={3}
              multiline
              label="Ответ B"
              register={register('b')}
              error={!!errors.b}
              helperText={errors.b?.message}
            />
            <CustomMultilineInput
              rows={3}
              multiline
              label="Ответ C"
              register={register('c')}
              error={!!errors.c}
              helperText={errors.c?.message}
            />
            <CustomMultilineInput
              rows={3}
              multiline
              label="Ответ D"
              register={register('d')}
              error={!!errors.d}
              helperText={errors.d?.message}
            />
          </Box>
        </Box>

        <Box className="flex w-full flex-col items-end gap-5">
          <Divider className="w-full" />
          <Box className="w-150">
            <BtnGroup
              isLoading={isSubmitting}
              leftBtnText="Отменить"
              leftBtnClick={clickOnClose}
              leftBtnColor="secondary"
              leftBtnVariant="contained"
              rightBtnText="Сохранить"
              rightBtnType="submit"
              rightBtnColor="success"
              rightBtnVariant="contained"
              disabledRight={!savingAvailable}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export { QuestionEditor };

import { useTranslation } from 'react-i18next';
import { ListGroup } from 'react-bootstrap';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import useActions from '../../../hooks/useActions';
import { getQuestionIndex } from '../../../selectors/quizSelectors';

import QuestionsProgress from './QuizProgress';
import QuestionsAnswerVariant from './AnswerVariant';
import MainButton from '../../../shared/components/buttons/MainButton';

import { typeQuestionAnswer } from '../../../types/types';
import { iQuestion } from '../../../types/iQuiz';
import { iUserAnswer } from '../../../types/iUser';

interface QuestionsSectionProps {
  questions: iQuestion[];
  quantityQuestions: number;
}

const QuestionsSection: React.FC<QuestionsSectionProps> = (props) => {
  const { questions, quantityQuestions } = props;
  const { addAnswer, nextQuestion } = useActions();
  const { t } = useTranslation();

  const [currentAnswer, setCurrentAnswer] = useState<iUserAnswer | null>(null);

  const questionsIndex = useSelector(getQuestionIndex);
  const currentQuestion = questions[questionsIndex];

  const handlerClickOnAnswer = (e: React.MouseEvent<HTMLLIElement>) => {
    const id = (e.target as HTMLLIElement).dataset.id as string;
    const userAnswerId = (e.target as HTMLLIElement).dataset.variant as string;
    const { correctAnswerId, question } = currentQuestion;

    const result: iUserAnswer = {
      questionId: id,
      question,
      userAnswerId,
      correctAnswerId,
      result: userAnswerId === correctAnswerId ? 1 : 0,
    };
    setCurrentAnswer(result);
  };

  const handelSaveResult = () => {
    if (currentAnswer) {
      addAnswer(currentAnswer);
      setCurrentAnswer(null);
      nextQuestion();
    }
  };

  return (
    <section className="col-11 col-md-10 col-xxl-8">
      <QuestionsProgress
        now={Math.round(((questionsIndex + 1) / quantityQuestions) * 100)}
        CurrentQuestion={questionsIndex + 1}
        TotalQuestions={quantityQuestions}
      />
      <div className="card shadow-sm mt-4 px-2">
        <ListGroup className="d-flex flex-column gap-1 text-center ">
          <p className="px-1 py-2 border-bottom fw-semibold fs-6 fs-lg-5">{`${currentQuestion.question}`}</p>
          {currentQuestion.answers.map((item: typeQuestionAnswer) => (
            <QuestionsAnswerVariant
              key={`${item.questionId}-${item.id}`}
              item={item}
              onClick={handlerClickOnAnswer}
              active={!!currentAnswer && item.id === currentAnswer.userAnswerId}
            />
          ))}
        </ListGroup>
        <div className="my-2 d-flex justify-content-end">
          <MainButton
            text={t('quizPage.quizStep.btn')}
            type="button"
            variant="success"
            onClick={handelSaveResult}
            disabled={!currentAnswer}
          />
        </div>
      </div>
    </section>
  );
};

export default QuestionsSection;

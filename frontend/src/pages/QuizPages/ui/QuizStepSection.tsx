import { Button, ListGroup } from 'react-bootstrap';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import useActions from '../../../hooks/useActions';
import { getQuestionIndex } from '../../../selectors/quizSelectors';

import QuestionsProgress from './QuizProgress';
import QuestionsAnswerVariant from './AnswerVariant';

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

  const [currentAnswer, setCurrentAnswer] = useState<iUserAnswer | null>(null);

  const questionsIndex = useSelector(getQuestionIndex);
  const currentQuestion = questions[questionsIndex];

  const handlerClickOnAnswer = (e: React.MouseEvent<HTMLLIElement>) => {
    const id = (e.target as HTMLLIElement).dataset.id as string;
    const userAnswerId = (e.target as HTMLLIElement).dataset.variant as string;
    const { correctAnswerId } = currentQuestion;
    const result = {
      id,
      userAnswerId,
      correctAnswerId,
      result: userAnswerId === correctAnswerId ? 1 : 0,
    };
    console.log('handlerClickOnAnswer -', result);
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
    <section className="col-12 col-md-10 col-xxl-8">
      <QuestionsProgress
        now={Math.round(((questionsIndex + 1) / quantityQuestions) * 100)}
        CurrentQuestion={questionsIndex + 1}
        TotalQuestions={quantityQuestions}
      />
      <div className="card shadow-sm my-3 px-2">
        <ListGroup className="d-flex flex-column gap-1 text-center ">
          <p className="py-2 border-bottom fw-semibold fs-5">{`${currentQuestion.question}:`}</p>
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
          <Button
            variant="success"
            className="mx-4"
            onClick={handelSaveResult}
            disabled={!currentAnswer}
          >
            Проверить
          </Button>
        </div>
      </div>
    </section>
  );
};

export default QuestionsSection;

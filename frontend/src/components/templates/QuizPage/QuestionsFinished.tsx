import { useSelector } from 'react-redux';

import { iQuestion, iUserAnswer } from '../../../models/interfaces';

import {
  getCurrentResult,
  getQuestions,
} from '../../../selectors/quizSelectors';

import QuestionsResultVariant from './QuestionsResultVariant';

const getQuestion = (questions: iQuestion[], id: string): iQuestion => {
  const result = questions.filter((item) => item.id === id);
  return result[0];
};

const QuestionsFinished = () => {
  const questions = useSelector(getQuestions) as iQuestion[];
  const currentResult = useSelector(getCurrentResult);

  return (
    <section className="col-10 col-md-8 col-xxl-6 my-5 d-flex justify-content-center align-items-center">
      <div className="card shadow-sm my-3 px-2">
        <h3 className="mx-auto text-uppercase text-center pt-4 pb-2">
          Ваши результаты
        </h3>
        {currentResult.map((userAnswer: iUserAnswer) => {
          // console.log('userAnswer   -', JSON.stringify(userAnswer));
          const currQuestion = getQuestion(questions, userAnswer.id);
          // console.log('currQuestion -', JSON.stringify(currQuestion));
          return (
            <div key={currQuestion.id} className="py-2">
              <QuestionsResultVariant
                currQuestion={currQuestion}
                userAnswer={userAnswer}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default QuestionsFinished;

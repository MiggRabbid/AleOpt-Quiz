import { useSelector } from 'react-redux';
import { Accordion } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import {
  getCurrentResult,
  getQuestions,
} from '../../../selectors/quizSelectors';
import routes from '../../../app/routes';
import useAuth from '../../../hooks/useAuth';
import useActions from '../../../hooks/useActions';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { getAnswerBg, getQuestion } from '../utils/forQuizFinished';
import { useAddUserStatsMutation } from '../../../app/store/api/stats.api';

import MainButton from '../../../shared/components/buttons/MainButton';
import SmileHappy from '../../../shared/components/icons/SmileHappy';
import SmileUnhappy from '../../../shared/components/icons/SmileUnhappy';
import UserStatBadge from '../../../shared/components/badge/UserStatBadge';

import { iQuestion } from '../../../types/iQuiz';
import { iResultEntryRequest, iUserAnswer } from '../../../types/iUser';
import { typeApiResponse } from '../../../types/types';

const getFormattedDate = (): string => {
  const date: Date = new Date();

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: '2-digit',
  };
  return date.toLocaleDateString('ru-RU', options).replace(' г.', '');
};

const QuestionsFinished = () => {
  const navigate = useNavigate();
  const { user, getAuthHeader } = useAuth();
  const { clearCurrentResult } = useActions();
  const headers = getAuthHeader() as typeApiResponse;

  const [addUserStats] = useAddUserStatsMutation();

  const questions = useSelector(getQuestions) as iQuestion[];
  const currentResult = useSelector(getCurrentResult);

  const resultSum = currentResult.reduce((acc: number, answer: iUserAnswer) => {
    return acc + answer.result;
  }, 0);

  const handelSaveResult = async () => {
    try {
      const body: iResultEntryRequest = {
        data: getFormattedDate(),
        answers: currentResult,
      };
      await addUserStats({
        headers,
        body,
        params: { username: user?.username || '' },
      });

      clearCurrentResult();
      useLocalStorage.delResult();
      navigate(routes.MainPagePath());
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <section className="w-100 h-100 p-5 rounded d-flex flex-column justify-content-center align-items-center bg-light-subtle gap-3">
      <div className="w-100 h-auto d-flex flex-row justify-content-between align-items-center">
        <div className="w-100 h-auto d-flex flex-row justify-content-center align-items-center">
          <h5 className="me-2 my-0 text-uppercase fw-bold text-center fs-4">
            {`Ваш результат - ${resultSum} из ${questions.length}`}
          </h5>
          <UserStatBadge
            averageResult={Math.floor((resultSum / questions.length) * 100)}
          />
        </div>

        <MainButton
          text="Отправить результат"
          type="button"
          variant="success"
          onClick={handelSaveResult}
        />
      </div>

      <Accordion
        defaultActiveKey="0"
        flush
        className="w-100 h-100 border rounded overflow-hidden"
      >
        {currentResult.map((userAnswer: iUserAnswer) => {
          const currQuestion = getQuestion(questions, userAnswer.questionId);

          return (
            <Accordion.Item key={currQuestion.id} eventKey={currQuestion.id}>
              <Accordion.Header className="position-relative">
                {userAnswer.result === 1 ? <SmileHappy /> : <SmileUnhappy />}
                <h6 className="ms-3">{currQuestion.question}</h6>
              </Accordion.Header>
              <Accordion.Body>
                <div className="d-flex flex-wrap rounded overflow-hidden border">
                  {currQuestion.answers.map((answer) => {
                    const className = `col-6 border p-3 m-0 ${getAnswerBg(currQuestion.correctAnswerId, answer.id, userAnswer.userAnswerId)}`;
                    return (
                      <p key={answer.id} className={className}>
                        {`${answer.id.toLocaleUpperCase()}: ${answer.answer}`}
                      </p>
                    );
                  })}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </section>
  );
};

export default QuestionsFinished;

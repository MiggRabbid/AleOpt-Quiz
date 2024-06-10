import { useSelector } from 'react-redux';
import { Accordion } from 'react-bootstrap';

import { iQuestion, iUserAnswer } from '../../../models/interfaces';

import { getCurrentResult, getQuestions } from '../../../selectors/quizSelectors';
import SmileHappy from '../../ui/icons/SmileHappy';
import SmileUnhappy from '../../ui/icons/SmileUnhappy';

const getQuestion = (questions: iQuestion[], id: string): iQuestion => {
  const result = questions.filter((item) => item.id === id);
  return result[0];
};

const getAnswerBg = (correctAnswer: string, currentAnswer: string, userAnswer: string) => {
  if (currentAnswer === correctAnswer) {
    return correctAnswer === userAnswer ? 'bg-success-subtle' : 'bg-primary-subtle';
  }

  if (currentAnswer === userAnswer) {
    return correctAnswer !== userAnswer ? 'bg-danger-subtle' : '';
  }

  return '';
};

const QuestionsFinished = () => {
  const questions = useSelector(getQuestions) as iQuestion[];
  const currentResult = useSelector(getCurrentResult);

  const resultSum = currentResult.reduce((acc, answer) => {
    return acc + answer.result;
  }, 0);

  return (
    <section className=" w-100 rounded d-flex  flex-column justify-content-center align-items-center bg-light-subtle py-5">
      <h1 className="mx-auto text-uppercase fw-bold text-center fs-4 mb-3">
        {`Ваш результат - ${resultSum} из ${questions.length}`}
      </h1>
      <Accordion defaultActiveKey="0" flush className="col-10 border rounded overflow-hidden">
        {currentResult.map((userAnswer: iUserAnswer) => {
          const currQuestion = getQuestion(questions, userAnswer.id);

          return (
            <Accordion.Item key={currQuestion.id} eventKey={currQuestion.id}>
              <Accordion.Header className="position-relative">
                {userAnswer.result === 1 ? <SmileHappy /> : <SmileUnhappy />}
                <h6 className="ms-2">{currQuestion.question}</h6>
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

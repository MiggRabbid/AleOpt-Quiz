import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Accordion } from 'react-bootstrap';

import { getQuestions } from '../../../selectors/quizSelectors';

import MainButton from '../../ui/MainButton';
import CreateNewQuestion from './CreateNewQuestion';

import { iQuestion } from '../../../models/interfaces';
import UserChangeButtonsGroup from '../../ui/UserChangeButtonsGroup';

const getNewQuestionId = (questions: iQuestion[] | undefined) => {
  return `${questions ? questions.length + 1 : 1}`;
};

const WatchQuestions = () => {
  console.group('----- WatchUsers');
  const questions = useSelector(getQuestions);
  const [modalState, setModalState] = useState(false);

  console.groupEnd();
  return (
    <section
      className="h-auto d-flex py-4 flex-column align-items-center bg-danger-subtle"
      id="admin-questions"
    >
      <div className="w-100 mb-3 position-relative bg-body-secondary">
        <h1 className="text-uppercase text-center fw-bold fs-3">
          Актуальные вопросы
        </h1>
        <div className="position-absolute top-50 translate-middle-y end-0 me-3">
          <MainButton
            text="Новый вопрос"
            onClick={() => setModalState(!modalState)}
          />
        </div>
      </div>
      <Accordion
        defaultActiveKey="0"
        flush
        className="col-10 border rounded overflow-hidden"
      >
        {questions?.map((question) => {
          return (
            <Accordion.Item key={question.id} eventKey={question.id}>
              <Accordion.Header>
                <h6>{`${question.id}) ${question.question}`}</h6>
              </Accordion.Header>
              <Accordion.Body className="d-flex justify-content-between align-items-start">
                <div className="w-100 d-flex flex-wrap rounded overflow-hidden border me-2">
                  {question.answers.map((answer) => {
                    return (
                      <p
                        key={answer.id}
                        className={`col-6 border p-4 m-0 ${question.correctAnswerId === answer.id ? ' bg-primary-subtle' : ''}`}
                      >
                        {`${answer.id.toLocaleUpperCase()}: ${answer.answer}`}
                      </p>
                    );
                  })}
                </div>
                <UserChangeButtonsGroup />
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
      <CreateNewQuestion
        modalState={modalState}
        setModalState={setModalState}
        questionId={getNewQuestionId(questions)}
      />
    </section>
  );
};

export default WatchQuestions;

import { useEffect, useState } from 'react';
import { Accordion, Spinner } from 'react-bootstrap';

import useAuth from '../../../hooks/useAuth';
import useActions from '../../../hooks/useActions';

import { useLazyGetAllQuestionsQuery } from '../../../store/quiz.api';

import MainButton from '../../ui/MainButton';
import CreateNewQuestion from './CreateNewQuestion';

import { typeApiResponse } from '../../../models/types';

const WatchQuestions = () => {
  console.group('----- WatchUsers');
  const { getAuthHeader } = useAuth();
  const headers = getAuthHeader() as typeApiResponse;
  const { setQuestions } = useActions();
  const [
    getAllQuestions,
    { data: questions, isLoading: isLoadingQuestions, error: questionsError },
  ] = useLazyGetAllQuestionsQuery();
  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    getAllQuestions(headers);
  }, []);

  useEffect(() => {
    if (questions) setQuestions(questions);
    console.log('questions      -', questions);
    console.log('questionsError -', questionsError);
  }, [questions, questionsError]);

  console.groupEnd();
  return (
    <section className="h-100 d-flex flex-column align-items-center">
      <div className="w-100 h-auto my-4 position-relative bg-body-tertiary">
        <h1 className="mx-auto text-uppercase text-center fw-bold fs-3">
          Актуальные вопросы
        </h1>
        <div className="position-absolute top-50 translate-middle-y end-0 me-3">
          <MainButton
            text="Новый вопрос"
            onClick={() => setModalState(!modalState)}
          />
        </div>
      </div>
      {isLoadingQuestions ? (
        <Spinner animation="border" variant="primary" className="mx-auto" />
      ) : (
        <>
          {' '}
          <Accordion
            defaultActiveKey="0"
            flush
            className="col-10 border rounded overflow-hidden"
          >
            {questions?.map((question) => {
              return (
                <Accordion.Item key={question.id} eventKey={question.id}>
                  <Accordion.Header>
                    <h6>{question.question}</h6>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="d-flex flex-wrap">
                      {question.answers.map((answer) => {
                        return (
                          <p key={answer.id} className="col-6 border p-4 m-0">
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
        </>
      )}
      <CreateNewQuestion
        modalState={modalState}
        setModalState={setModalState}
      />
    </section>
  );
};

export default WatchQuestions;

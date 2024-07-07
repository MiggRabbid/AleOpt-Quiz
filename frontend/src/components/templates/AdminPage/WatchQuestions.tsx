import { useSelector } from 'react-redux';
import { Accordion } from 'react-bootstrap';

import { getQuestions } from '../../../selectors/quizSelectors';
import useActions from '../../../hooks/useActions';

import MainButton from '../../ui/buttons/MainButton';
import UserChangeButtonsGroup from '../../ui/buttons/ChangeButtonsGroup';

import { FabricModalType } from '../../../models/interfaces';

const WatchQuestions = () => {
  console.group('----- WatchQuestions');

  const questions = useSelector(getQuestions);
  const { openModal } = useActions();

  console.groupEnd();
  return (
    <section
      className="h-100 d-flex py-4 flex-column align-items-center"
      style={{
        minHeight: 'calc(100vh - 96px - 8px - 8px - 66px)',
      }}
      id="adminQuestions"
    >
      <div className="w-100 mb-3 position-relative">
        <h1 className="text-uppercase text-center fw-bold fs-3">
          Актуальные вопросы
        </h1>
        <div className="position-absolute top-50 translate-middle-y end-0 me-3">
          <MainButton
            text="Новый вопрос"
            onClick={() =>
              openModal({
                modalType: FabricModalType.newQuestion,
                modalData: null,
              })
            }
          />
        </div>
      </div>
      <div className="w-100 mx-auto overflow-y-auto">
        <Accordion
          defaultActiveKey="0"
          flush
          className="col-10 mx-auto border rounded overflow-hidden"
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
                  <UserChangeButtonsGroup data={question} />
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
};

export default WatchQuestions;

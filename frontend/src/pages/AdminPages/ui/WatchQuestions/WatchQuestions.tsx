import { useSelector } from 'react-redux';
import { Accordion } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import useActions from '../../../../hooks/useActions';
import { getQuestions } from '../../../../selectors/quizSelectors';

import MainButton from '../../../../shared/components/buttons/MainButton';
import QuestionAccordionBody from './QuestionAccordionBody';

import { iQuestion } from '../../../../types/iQuiz';
import { FabricModalType } from '../../../../types/iModal';

const WatchQuestions = () => {
  const { t } = useTranslation();
  const questions: iQuestion[] = useSelector(getQuestions);
  const { openModal } = useActions();

  return (
    <section
      className="h-100 d-flex py-4 flex-column align-items-center"
      style={{
        minHeight: 'calc(100vh - 82px - 8px - 8px - 64px)',
      }}
      id="adminQuestions"
    >
      <div className="col-11 mb-3 d-flex flex-row justify-content-between align-items-center">
        <h1 className="w-100 text-uppercase ms-3 me-2 text-start fw-bold fs-4 fs-lg-3">
          {t('adminPage.questions.title')}
        </h1>
        <MainButton
          text={t('adminPage.questions.btnNewUser')}
          onClick={() =>
            openModal({
              modalType: FabricModalType.newQuestion,
              modalData: null,
            })
          }
        />
      </div>
      <Accordion
        defaultActiveKey="0"
        flush
        className="col-12 col-lg-10 px-3 border rounded overflow-hidden"
      >
        {questions?.map((question, index) => {
          return (
            <Accordion.Item key={question.id} eventKey={question.id}>
              <Accordion.Header>
                <p className="m-0 me-2 fs-6 fs-lg-5">{`${index + 1})`}</p>
                <p className="m-0 me-2 fs-6 fs-lg-5">{`${question.question}`}</p>
              </Accordion.Header>
              <QuestionAccordionBody question={question} />
            </Accordion.Item>
          );
        })}
      </Accordion>
    </section>
  );
};

export default WatchQuestions;

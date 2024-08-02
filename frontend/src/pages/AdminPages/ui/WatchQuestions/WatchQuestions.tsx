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
      <div className="col-10 mb-3 d-flex flex-row justify-content-between align-items-center">
        <h1 className="text-uppercase text-start fw-bold fs-3">{t('adminPage.questions.title')}</h1>
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
        className="col-12 col-md-11 col-xl-10 border rounded overflow-hidden"
      >
        {questions?.map((question, index) => {
          return (
            <Accordion.Item key={question.id} eventKey={question.id}>
              <Accordion.Header>
                <h6>{`${index + 1}) ${question.question}`}</h6>
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

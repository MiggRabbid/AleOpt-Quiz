import { useFormik } from 'formik';
import { Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import useAuth from '../../../hooks/useAuth';
import useActions from '../../../hooks/useActions';
import { getQuestions } from '../../../selectors/quizSelectors';
import {
  useAddNewQuestionMutation,
  useEditQuestionMutation,
} from '../../../app/api/quiz.api';
import { getAnswersKeys, getNewQuestionId, getResponseBody } from './utils/modalQuestionUtils';
import { getQuestionValidationSchema } from './utils/modalsValidationSchema';
import { getQuestionInitialValue } from './utils/modalsInitialValue';

import FormInput from '../forms/InputFabric';
import MainButton from '../buttons/MainButton';

import { iQuestion } from '../../../types/iQuiz';
import { typeApiResponse } from '../../../types/types';

interface iModalNewQuestionProps {
  type: string;
  modalState: boolean;
  onHide: () => void;
  question: iQuestion | null;
}

const ModalNewQuestion: React.FC<iModalNewQuestionProps> = (props) => {
  const { type, modalState, onHide, question } = props;

  const { t } = useTranslation();
  const { getAuthHeader } = useAuth();
  const headers = getAuthHeader() as typeApiResponse;
  const { setQuestions } = useActions();
  const AllQuestions = useSelector(getQuestions);

  const [addNewQuestion] = useAddNewQuestionMutation();
  const [editQuestion] = useEditQuestionMutation();

  const formik = useFormik({
    initialValues: getQuestionInitialValue(question),
    validationSchema: getQuestionValidationSchema(t),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        let response;

        const questionId = !!question ? question.id : getNewQuestionId(AllQuestions);
        const body = getResponseBody(values, questionId);

        if (!!question) {
          response = await editQuestion({
            headers,
            body,
            params: { id: question.id },
          });
        } else {
          response = await addNewQuestion({
            headers,
            body,
          });
        }

        if ('data' in response) {
          setQuestions(response.data);
          onHide();
        } else {
          console.error('Unexpected response structure:', response);
        }
      } catch (e) {
        console.error(e);
      }
      setSubmitting(false);
    },
  });
  // Думаю, что это костыль, а не типизация
  const handleSubmitWrapper = (
    event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    formik.handleSubmit();
  };

  console.groupEnd();
  return (
    <Modal
      show={modalState}
      onHide={onHide}
      dialogClassName="modal-dialog-centered"
      className="col-12 col-lg-10 xl-8"
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>{t(`shared.modals.${type}.title`)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          className="d-flex flex-wrap justify-content-center position-relative"
          onSubmit={formik.handleSubmit}
        >
          <Form.Group className="col-12 col-lg-6 mb-3 mb-lg-0 px-1 d-flex flex-column gap-2">
            <FormInput
              className="w-100"
              controlId="questionInput"
              label={t(`shared.modals.${type}.inputQuestion`)}
              height="279px"
              as="textarea"
              name="question"
              placeholder={t(`shared.modals.${type}.inputQuestion`)}
              value={formik.values.question}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.question}
              error={formik.errors.question}
            />

            <FormInput
              className="w-100"
              controlId="roleSelect"
              label={t(`shared.modals.${type}.selectCorrectAnswer`)}
              placeholder={
                !!question
                  ? `${t(`shared.modals.${type}.currentCorrectAnswer`)}${question.correctAnswerId.toLocaleUpperCase()}`
                  : t(`shared.modals.${type}.currentCorrectAnswer`)
              }
              height="57px"
              as="select"
              name="correctAnswerId"
              value={formik.values.correctAnswerId}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.correctAnswerId}
              options={{
                a: 'Вариант A',
                b: 'Вариант B',
                c: 'Вариант C',
                d: 'Вариант D',
              }}
              error={formik.errors.correctAnswerId}
            />
          </Form.Group>

          <Form.Group className="col-12 col-lg-6 px-1 d-flex flex-column gap-2">
            {getAnswersKeys(formik.values.answers).map((key) => (
              <FormInput
                key={key}
                className="w-100"
                controlId={`answer${key.toUpperCase()}`}
                label={`${t(`shared.modals.${type}.inputAnswer`)}${key.toUpperCase()}`}
                height="80px"
                as="textarea"
                name={`answers.${key}`}
                placeholder={`${t(`shared.modals.${type}.selectValue`)}${key.toUpperCase()}`}
                value={formik.values.answers[key]}
                onChange={formik.handleChange}
                isInvalid={!!formik.errors.answers?.[key]}
                error={formik.errors.answers?.[key]}
              />
            ))}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <MainButton
          onClick={handleSubmitWrapper}
          text={t('shared.modals.btnCreate')}
          type="submit"
        />
      </Modal.Footer>
    </Modal>
  );
};

export default ModalNewQuestion;

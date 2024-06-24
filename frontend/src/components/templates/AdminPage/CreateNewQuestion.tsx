import { useFormik } from 'formik';
import { Form, Modal } from 'react-bootstrap';

import { useAddNewQuestionMutation } from '../../../store/quiz.api';
import useActions from '../../../hooks/useActions';
import useAuth from '../../../hooks/useAuth';

import FormInput from '../../ui/forms/FormInput';
import MainButton from '../../ui/MainButton';

import { typeApiResponse } from '../../../models/types';

interface iCreateNewQuestionProps {
  modalState: boolean;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
  questionId: string;
}

type typeAnswersKeys = 'a' | 'b' | 'c' | 'd';

type typeAnswers = Record<typeAnswersKeys, string>;

interface iNewQuestionFormValues {
  question: string;
  answers: typeAnswers;
  correctAnswerId: string;
}

const initialValues: iNewQuestionFormValues = {
  question: '',
  answers: {
    a: '',
    b: '',
    c: '',
    d: '',
  },
  correctAnswerId: '',
};

const getResponseBody = (value: iNewQuestionFormValues, questionId: string) => {
  const body = {
    id: questionId,
    question: value.question,
    answers: Object.entries(value.answers).map(([id, answer]) => {
      return { questionId, id, answer };
    }),
    correctAnswerId: value.correctAnswerId,
  };
  console.log('getResponseBody', body);

  return body;
};

const getAnswersKeys = (obj: typeAnswers) => {
  return Object.keys(obj) as typeAnswersKeys[];
};

const CreateNewQuestion: React.FC<iCreateNewQuestionProps> = (props) => {
  console.group('----- CreateNewQuestion');
  const { modalState, setModalState, questionId } = props;

  const { getAuthHeader } = useAuth();
  const headers = getAuthHeader() as typeApiResponse;
  const { setQuestions } = useActions();
  const [addNewQuestion] = useAddNewQuestionMutation();

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const body = getResponseBody(values, questionId);
        const response = await addNewQuestion({ headers, body });
        setQuestions(response.data);
        setModalState(!modalState);
      } catch (e) {
        console.error(e);
      }
      setSubmitting(false);
    },
  });

  console.groupEnd();
  return (
    <Modal
      show={modalState}
      onHide={() => setModalState(!modalState)}
      dialogClassName="modal-dialog-centered"
      className="col-12 col-lg-10 xl-8"
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Создание нового вопроса</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          className="d-flex flex-wrap justify-content-end position-relative"
          onSubmit={formik.handleSubmit}
        >
          <Form.Group className="col-12 col-md-6 d-flex flex-column gap-2 pe-2 mb-2">
            <FormInput
              className="w-100"
              controlId="questionInput"
              label="Вопрос"
              height="190px"
              as="textarea"
              name="question"
              placeholder="Вопрос"
              value={formik.values.question}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.question}
            />

            <FormInput
              className="w-100"
              controlId="roleSelect"
              label="Варианты ответов"
              placeholder="Выберите верный"
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
            />
          </Form.Group>

          <Form.Group className="col-11 col-md-6 d-flex flex-column gap-2 ps-2 mb-2">
            {getAnswersKeys(formik.values.answers).map((key) => (
              <FormInput
                key={key}
                className="w-100"
                controlId={`answer${key.toUpperCase()}`}
                label={`Введите ответ ${key.toUpperCase()}`}
                height="50px"
                as="textarea"
                name={`answers.${key}`}
                placeholder={`Ответ ${key.toUpperCase()}`}
                value={formik.values.answers[key]}
                onChange={formik.handleChange}
                isInvalid={!!formik.errors.answers?.[key]}
              />
            ))}
          </Form.Group>

          <MainButton text="Создать" type="submit" />
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateNewQuestion;

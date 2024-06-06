import { useFormik } from 'formik';
import { Form, Modal } from 'react-bootstrap';
import FormInput from '../../ui/forms/FormInput';
import MainButton from '../../ui/MainButton';

interface iCreateNewQuestionProps {
  modalState: boolean;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
}

type typeAnswersKeys = 'a' | 'b' | 'c' | 'd';

type typeAnswers = Record<typeAnswersKeys, string>;

interface FormValues {
  question: string;
  answers: typeAnswers;
  correctAnswer: string;
}

const initialValues: FormValues = {
  question: '',
  answers: {
    a: '',
    b: '',
    c: '',
    d: '',
  },
  correctAnswer: '',
};

const getAnswersKeys = (obj: typeAnswers) => {
  return Object.keys(obj) as typeAnswersKeys[];
};

const CreateNewQuestion: React.FC<iCreateNewQuestionProps> = (props) => {
  const { modalState, setModalState } = props;
  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        console.log('formik onSubmit -', values);
        setModalState(!modalState);
      } catch (e) {
        console.error(e);
      }
      setSubmitting(false);
    },
  });

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
              label="Выберите верный вариант ответа"
              height="57px"
              as="select"
              name="correctAnswer"
              value={formik.values.correctAnswer}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.correctAnswer}
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

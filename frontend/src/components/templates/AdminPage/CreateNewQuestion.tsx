import { useFormik } from 'formik';
import { Button, FloatingLabel, Form } from 'react-bootstrap';

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

const CreateNewQuestion = () => {
  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        console.log('formik onSubmit -', values);
      } catch (e) {
        console.error(e);
      }
      setSubmitting(false);
    },
  });

  return (
    <Form
      className="h-auto w-100 m-auto d-flex flex-wrap justify-content-around position-relative rounded-2 border-2 shadow py-5"
      onSubmit={formik.handleSubmit}
    >
      <Form.Group className="col-12 col-md-6 d-flex flex-column gap-2 px-2 mb-2">
        <FloatingLabel
          className="w-100"
          controlId="questionInput"
          label="Вопрос"
        >
          <Form.Control
            style={{ height: '190px', minWidth: '150px' }}
            as="textarea"
            name="question"
            placeholder="Вопрос"
            required
            value={formik.values.question}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.question}
          />
        </FloatingLabel>

        <Form.Select
          required
          name="correctAnswer"
          aria-label="Выберите верный вариант ответа"
          style={{ height: '57px', minWidth: '150px' }}
          onChange={formik.handleChange}
          defaultValue=""
        >
          <option>Выберите верный вариант ответа</option>
          <option value="a">Вариант A</option>
          <option value="b">Вариант B</option>
          <option value="c">Вариант C</option>
          <option value="d">Вариант D</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="col-12 col-md-6 d-flex flex-column gap-2 px-2  mb-2">
        {getAnswersKeys(formik.values.answers).map((key) => (
          <FloatingLabel
            key={key}
            controlId={`answer${key.toUpperCase()}`}
            label={`Введите ответ ${key.toUpperCase()}`}
          >
            <Form.Control
              className="w-100"
              style={{ height: '50px', minWidth: '150px' }}
              as="textarea"
              name={`answers.${key}`}
              placeholder={`Ответ ${key.toUpperCase()}`}
              required
              value={formik.values.answers[key]}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.answers?.[key]}
            />
          </FloatingLabel>
        ))}
      </Form.Group>

      <Button
        type="submit"
        variant="outline-success"
        className="px-2 py-1"
        style={{ height: '50px', width: '200px' }}
      >
        Добавить вопрос
      </Button>
    </Form>
  );
};

export default CreateNewQuestion;

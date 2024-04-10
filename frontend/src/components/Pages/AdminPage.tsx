import { useFormik } from "formik";
import { Button, FloatingLabel, Form } from "react-bootstrap";

interface FormValues {
  question: string;
  answers: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  correctAnswer: {
    a: boolean;
    b: boolean;
    c: boolean;
    d: boolean;
  };
}

const initialValues: FormValues = {
  question: '',
  answers: { a: '', b: '', c: '', d: '' },
  correctAnswer: { a: false, b: false, c: false, d: false },
};

const AdminPage = () => {
  console.log('----- AdminPage');

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
    <main className="container-xxl h-100">
      <h2 className="mt-5">AdminPage</h2>
      <Form className="w-100 col-md-6 mt-3 d-flex flex-column gap-2 position-relative" onSubmit={formik.handleSubmit}>

        <Form.Group className="row-9 d-flex flex-row gap-3">
          <FloatingLabel className="w-75" controlId="questionInput" label="Вопрос">
            <Form.Control
              style={{ height: '150px' }} 
              as="textarea"
              name="question"
              placeholder="Вопрос"                     
              required
              value={formik.values.question}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.question}
            />
          </FloatingLabel>

          <div className="w-25 d-flex flex-column justify-content-center border py-2 px-4 rounded-3" style={{ height: '150px' }}>
            <p className="w-100 text-center p-0 m-0">Выберите правильный</p>
            <p className="w-100 text-center p-0 m-0">ответ или ответы</p>
            <Form.Label className="w-100 d-flex flex-row flex-wrap justify-content-center mt-3"  controlId="correctAnswerCheckbox" label="Вопрос">
              <Form.Check
                className="w-50 h-50"
                type="checkbox"
                id="a"
                label="Ответ А"
                value={formik.values.correctAnswer.a}
                onChange={formik.handleChange}
              />
                <Form.Check
                className="w-50 h-50"
                type="checkbox"
                id="b"
                label="Ответ Б"
                value={formik.values.correctAnswer.b}
                onChange={formik.handleChange}
              />
              <Form.Check
                className="w-50 h-50"
                type="checkbox"
                id="c"
                label="Ответ В"
                value={formik.values.correctAnswer.c}
                onChange={formik.handleChange}
              />
              <Form.Check
                className="w-50 h-50"
                type="checkbox"
                id="d"
                label="Ответ Г"
                value={formik.values.correctAnswer.d}
                onChange={formik.handleChange}
              />
            </Form.Label>
          </div>
        </Form.Group>

        {/* <div className="w-100 col-md-6 mt-3 d-flex flex-column gap-2">
          <Form.Group className="w-100 h-50 d-flex flex-row gap-2">

            <FloatingLabel className="w-50 h-50" controlId="answerATextarea" label="Ответ - А">
              <Form.Control
                style={{ height: '100px' }} 
                as="textarea"
                name="answerA"
                placeholder="Ответ - А"
                required
                value={formik.values.answers.a}
                onChange={formik.handleChange}
                isInvalid={!!formik.errors.answers?.a}
              />
            </FloatingLabel>
            <FloatingLabel className="w-50 h-50" controlId="answerBTextarea" label="Ответ - Б">
              <Form.Control
                style={{ height: '100px' }} 
                as="textarea"
                name="answerB"
                placeholder="Ответ - Б"
                required
                value={formik.values.answers.b}
                onChange={formik.handleChange}
                isInvalid={!!formik.errors.answers?.b}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="w-100 h-50 d-flex flex-row gap-2">
            <FloatingLabel className="w-50 h-50" controlId="answerCTextarea" label="Ответ - В">
              <Form.Control
                style={{ height: '100px' }} 
                as="textarea"
                name="answerC"
                placeholder="Ответ - В"
                required
                value={formik.values.answers.c}
                onChange={formik.handleChange}
                isInvalid={!!formik.errors.answers?.c}
              />
            </FloatingLabel>
            <FloatingLabel className="w-50 h-50" controlId="answerDTextarea" label="Ответ - Г">
              <Form.Control
                style={{ height: '100px' }} 
                as="textarea"
                name="answerD"
                placeholder="Ответ - Г"
                required
                value={formik.values.answers.d}
                onChange={formik.handleChange}
                isInvalid={!!formik.errors.answers?.d}
              />
            </FloatingLabel>
          </Form.Group>
        </div> */}


        <Button type="submit" variant="outline-success" className="w-25 py-2 my-4 position-relative bottom-0 start-50 translate-middle">
          Добавить вопрос
        </Button>

      </Form>
    </main>
  )
};

export default AdminPage;
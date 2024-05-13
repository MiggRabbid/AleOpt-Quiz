import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useFormik } from "formik";

import useAuth from "../../hooks/useAuth";
import routes from "../../routes";

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
  console.log('----- AdminPage')
  const navigate = useNavigate()
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    if (!user || !!user && !isAdmin(user)) navigate(routes.loginPagePath())
  }, [user, isAdmin])

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
        </Form.Group>

        <Button type="submit" variant="outline-success" className="w-25 py-2 my-4 position-relative bottom-0 start-50 translate-middle">
          Добавить вопрос
        </Button>

      </Form>
    </main>
  )
};

export default AdminPage;
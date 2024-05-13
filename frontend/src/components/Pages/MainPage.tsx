import { useEffect } from 'react'
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { iQuestion } from '../../interfaces';

import fakeApi from '../../FakeApi';
import routes from "../../routes";
import useActions from '../../hooks/useActions';
import useAuth from '../../hooks/useAuth';

const Main = () => {
  console.log('----- Main');
  const navigate = useNavigate();
  const { setQuestions } = useActions();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    if (!!user && isAdmin(user)) navigate(routes.AdminPagePath());
  })

  useEffect(() => {
    try {
      const response = fakeApi(routes.dataRequestPath(), );
      if (response.status === '200') {
        console.log(response)
        setQuestions(response.data as iQuestion[]);
      } else {
        throw new Error(JSON.stringify(response.data));
      }
    } catch (e) {
      console.error(e);
    }
  }, [])

  return (
    <main className="container-xl h-100 d-flex align-items-center justify-content-center">
      <section className="col-12 col-md-10 col-xxl-8 d-flex flex-column align-items-center justify-content-center position-relative">
        <h3 className="text-uppercase py-5 position-absolute top-0 fw-semibold">{`${user?.name}, Добро пожаловать`}</h3>
        <article className="col-12 py-5 px-4 card shadow-sm d-flex flex-column">
          <p className="text-center pb-5 text-uppercase fs-5 fw-semibold">ТЕСТ ДЛЯ ПРОВЕРКИ УРОВНЯ ТЕОРЕТИЧЕСКИХ ЗНАНИЙ СОТРУДНИКОВ "АЛЁОПТ"</p>
          <p>Данный тест предназначит для того, чтобы проверить уровень знания сотрудников о товаре, с которым они работают и по которому консультируют покупателей. А так же для того, чтобы понять какую информацию в первую очередь нужно внести в базу знаний.</p>
          <p>Во всех вопросах верный только один ответ. Выбирайте всегда максимально внимательно, бывают подвохи.</p>
          <div className="position-relative pt-5">
          <Button
            variant="success"
            className="position-relative start-50 translate-middle-x"
            onClick={() => navigate(routes.QuizPagePath())}
          >
            Охх, ну понеслось что-ли...
          </Button>
        </div>
        </article>
      </section>
    </main>
  );
}

export default Main;
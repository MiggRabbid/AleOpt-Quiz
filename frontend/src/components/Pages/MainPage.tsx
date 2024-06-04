import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import routes from '../../routes';
import useAuth from '../../hooks/useAuth';
import { useGetAllQuestionsQuery } from '../../store/quiz.api';
import { typeApiResponse } from '../../models/types';
import useActions from '../../hooks/useActions';

const MainPage = () => {
  console.log('----- MainPage');
  const navigate = useNavigate();
  const { user, isAdmin, getAuthHeader } = useAuth();
  const { setQuestions } = useActions();
  const headers = getAuthHeader() as typeApiResponse;
  const { data: questions, error } = useGetAllQuestionsQuery(headers);

  useEffect(() => {
    if (!!user && isAdmin(user)) navigate(routes.AdminPagePath());
  });

  useEffect(() => {
    if (questions) setQuestions(questions);
    console.group('----- MainPage');
    console.log('headers -', headers);
    console.groupEnd();
  }, [headers]);

  useEffect(() => {
    if (questions) setQuestions(questions);
    console.group('----- MainPage');
    console.log('questions -', questions);
    console.log('error -', error);
    console.groupEnd();
  }, [questions, error]);

  return (
    <main className="container-xl h-100 d-flex align-items-center justify-content-center">
      <section className="col-12 col-md-10 col-xxl-8 d-flex flex-column align-items-center justify-content-center position-relative">
        <h3 className="text-uppercase py-5 position-absolute top-0 fw-semibold">{`${user?.name}, Добро пожаловать`}</h3>
        <article className="col-12 py-5 px-4 card shadow-sm d-flex flex-column">
          <p className="text-center pb-5 text-uppercase fs-5 fw-semibold">
            ТЕСТ ДЛЯ ПРОВЕРКИ УРОВНЯ ТЕОРЕТИЧЕСКИХ ЗНАНИЙ СОТРУДНИКОВ АЛЁОПТ
          </p>
          <p>
            Данный тест предназначит для того, чтобы проверить уровень знания
            сотрудников о товаре, с которым они работают и по которому
            консультируют покупателей. А так же для того, чтобы понять какую
            информацию в первую очередь нужно внести в базу знаний.
          </p>
          <p>
            Во всех вопросах верный только один ответ. Выбирайте всегда
            максимально внимательно, бывают подвохи.
          </p>
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
};

export default MainPage;

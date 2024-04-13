import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import routes from "../../routes";

const Main = () => {
  console.log('----- Main');
  const navigate = useNavigate();

  return (
    <main className="container-xxl h-100 d-flex justify-content-between" >
      <section className="col-12 my-5 bg-body-secondary d-flex flex-column align-items-center">
        <h1>Welcome to Quiz</h1>
        <article className="my-5">
          <p>Данный тест создан для проверки знаний сотрудников</p>
        </article>
        <div>
          <Button variant="success" onClick={() => navigate(routes.QuizPagePath())}>
            Приступить
          </Button>
        </div>
      </section>
    </main>
  );
}

export default Main;
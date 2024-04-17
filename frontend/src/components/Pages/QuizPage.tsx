import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";

import { questionsType, currentAnswerType } from '../../types';

import { getQuestions } from '../../selectors/quizSelectors'
import { Form, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import routes from "../../routes";

import QuestionsProgress from "../templates/QuestionsProgress";

const QuizPage = () => {
  const navigate = useNavigate()
  const { user } = useAuth();
  const [currentAnswer, setCurrentAnswer] = useState<currentAnswerType>(null)
  const [indexQuestion, setIndexQuestion] = useState(0);
  const questions = useSelector(getQuestions) as questionsType;
  const currentQuestion = questions[indexQuestion];
  const quantityQuestions = Object.keys(questions).length;

  useEffect(() => {
    if (!user || quantityQuestions === 0) navigate(routes.MainPagePath())
  }, [user]);

  useEffect(() => console.log('currentAnswer -',currentAnswer), [currentAnswer])

  const handlerClickOnAnswer = (e: React.MouseEvent<HTMLLIElement>) => {
    const targetId = (e.target as HTMLLIElement).id;
    const result = {
      userAnswer: targetId,
      correctAnswer: currentQuestion.correctAnswer,
      result: targetId === currentQuestion.correctAnswer ? 1 : 0,
    };
    setCurrentAnswer(result);
  }

  return (
    <main className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        { (indexQuestion < quantityQuestions)
        ? <section className="col-12 col-md-8 col-xxl-6">
          <QuestionsProgress
            now={Math.round((indexQuestion + 1 )/quantityQuestions*100)}
            CurrentQuestion={indexQuestion + 1}
            TotalQuestions={quantityQuestions}
          />
          <div className="card shadow-sm my-3 px-2">
            <ListGroup className="text-center">
                <p className="py-2 border-bottom fw-semibold fs-5">
                  {`${currentQuestion.question}:`}
                </p>
                {
                currentQuestion.answers.map((item: any) => (
                  <ListGroupItem
                    key={item.id}
                    id={item.id}
                    action
                    variant="light"
                    onClick={handlerClickOnAnswer}
                    className="w-100 py-3 fw-medium fs-5"
                  >
                    {`${item.id.toUpperCase()}:  ${item.answer}`}
                  </ListGroupItem>
                ))
                }
            </ListGroup>
            <div className="my-2 d-flex justify-content-between">
              <Button variant="success" className="mx-4">Проверить</Button>
              <Button
                variant="success"
                className="mx-4"
                onClick={() => setIndexQuestion(indexQuestion + 1)}
              >
                Следующий
              </Button>
            </div>
          </div>
        </section>
        : <section className="col-12 col-md-8 col-xxl-6"><p>Тест пройден</p></section>
        }

      </div>
    </main>
  );
}

export default QuizPage;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";


import { questionsType } from '../../types';
import { iAnswer } from "../../interfaces";

import { getQuestionIndex, getQuestions } from '../../selectors/quizSelectors'
import useActions from "../../hooks/useActions";
import useAuth from "../../hooks/useAuth";
import routes from "../../routes";

import QuestionsProgress from "../templates/QuestionsProgress";

const QuizPage = () => {
  const navigate = useNavigate()
  const { user } = useAuth();
  const { addAnswer, nextQuestion, changeQuizState } = useActions();

  const [currentAnswer, setCurrentAnswer] = useState<iAnswer | null>(null)
  const [indexQuestion, setIndexQuestion] = useState(0);

  const questionsIndex = useSelector(getQuestionIndex);
  const questions = useSelector(getQuestions) as questionsType;
  const currentQuestion = questions[indexQuestion];
  const quantityQuestions = Object.keys(questions).length;

  useEffect(() => {
    if (!user || quantityQuestions === 0) navigate(routes.MainPagePath())
  }, [user]);

  changeQuizState(true);

  useEffect(() => console.log('currentAnswer -', currentAnswer), [currentAnswer])
  useEffect(() => console.log('indexQuestion -', indexQuestion), [indexQuestion])
  useEffect(() => console.log('nextQuestions -', questionsIndex), [questionsIndex])
  useEffect(() => console.log('nextQuestions -', questionsIndex), [questionsIndex])

  const handlerClickOnAnswer = (e: React.MouseEvent<HTMLLIElement>) => {
    const targetId = (e.target as HTMLLIElement).id;
    const result = {
      id: targetId,
      userAnswer: targetId,
      correctAnswer: currentQuestion.correctAnswer,
      result: targetId === currentQuestion.correctAnswer ? 1 : 0,
    };
    setCurrentAnswer(result);
  }

  const handelSaveResult = () => {
    console.log(questionsIndex, currentAnswer)
    if (!!currentAnswer) {
      addAnswer(currentAnswer);
      nextQuestion();
    };
  };

  return (
    <main className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        { (questionsIndex < quantityQuestions)
        ? <section className="col-12 col-md-8 col-xxl-6">
          <QuestionsProgress
            now={Math.round((questionsIndex + 1 )/quantityQuestions*100)}
            CurrentQuestion={questionsIndex + 1}
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
                    className="w-100 py-3 fw-medium fs-5 text-start"
                  >
                    {`${item.id.toUpperCase()}: ${item.answer}`}
                  </ListGroupItem>
                ))
                }
            </ListGroup>
            <div className="my-2 d-flex justify-content-between">
              <Button
                variant="success"
                className="mx-4"
                onClick={handelSaveResult}
                disabled={!currentAnswer}
              >
                Проверить
              </Button>
              <Button
                variant="success"
                className="mx-4"
                onClick={() => setIndexQuestion(indexQuestion + 1)}
                disabled={!questionsIndex}
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
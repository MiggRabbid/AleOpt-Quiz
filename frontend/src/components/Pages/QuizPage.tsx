import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";

import { getQuestions } from '../../selectors/quizSelectors'

import QuestionsProgress from "../templates/QuestionsProgress";



const QuizPage = () => {
  console.log('----- QuizPage')
  const [indexQuestion, setIndexQuestion] = useState(1)
  const currentQuestions = useSelector(getQuestions)
  const currentQuestion = currentQuestions[indexQuestion-1]
  const quantityQuestions = currentQuestions.length;

  const handlerClickOnAnswer = (e: React.MouseEvent<HTMLLIElement>) => {
    const targetId = (e.target as HTMLLIElement).id;
    const result = { userResponse: targetId, correctAnswer: currentQuestion.correctAnswer.join(', ') };
    console.log('result -', result);
  }

  return (
    <main className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <section className="col-12 col-md-8 col-xxl-6">
          <QuestionsProgress
            now={Math.round(indexQuestion/quantityQuestions*100)}
            CurrentQuestion={indexQuestion}
            TotalQuestions={quantityQuestions}
          />
          <div className="card shadow-sm my-3 px-2">
            <ListGroup as="ul" className="text-center">
                <p className="py-2 border-bottom fw-semibold fs-4">
                  {`${currentQuestion.question}:`}
                </p>
                {
                currentQuestion.answers.map((item) => (
                  <ListGroupItem
                    key={item.id}
                    id={item.id}
                    action
                    variant="light"
                    onClick={handlerClickOnAnswer}
                    className="w-100 py-3 fw-medium fs-5"
                  >
                    {`${item.id.toUpperCase()}: ${item.answer}`}
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
      </div>
    </main>
  );
}

export default QuizPage;
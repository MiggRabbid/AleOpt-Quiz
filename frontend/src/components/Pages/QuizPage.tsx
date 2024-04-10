import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import QuestionsProgress from "../templates/QuestionsProgress";

interface Question {
  question: string;
  answers: { id: string; answer: string }[];
  correctAnswer: string[];
}

const data: Question[] = [
  {
    question: 'question 1',
    answers: [{id: 'a', answer: 'aaaa'}, {id: 'b', answer: 'bbbb'}, {id: 'c', answer: 'cccc'}, {id: 'd', answer: 'dddd'}],
    correctAnswer: ['a'],
  },
  {
    question: 'question 2',
    answers: [
      {
        id: 'a',
        answer: 'aaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaa aaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaa aaaaaa',
      },
      {
        id: 'b',
        answer: 'bbbbbbbbbbbbbbbbbbbb bbbbbbbbbbbb bbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbb bbbbbbbbbbbb bbbbbbbbbbbbbbbb bbbbbbbbbbbb',
      },
      {
        id: 'c',
        answer: 'cccc  cccccccccccccccccccccccc cccc cccc cccc cccc cccccccccccc cccc cccc cccc cccc cccc cccc',
      },
      {
        id: 'd',
        answer: 'dddd dddd dddddddd dddddddddddd dddddddddddd dddddddddddd dddddddddddd dddddddddddd dddddddddddd dddddddddddd',
      }],
    correctAnswer: ['a', 'b'],
  },
  {
    question: 'question 3',
    answers: [{id: 'a', answer: 'aaaa'}, {id: 'b', answer: 'bbbb'}, {id: 'c', answer: 'cccc'}, {id: 'd', answer: 'dddd'}],
    correctAnswer: ['c'],
  },
  {
    question: 'question 4',
    answers: [{id: 'a', answer: 'aaaa'}, {id: 'b', answer: 'bbbb'}, {id: 'c', answer: 'cccc'}, {id: 'd', answer: 'dddd'}],
    correctAnswer: ['d'],
  },
  {
    question: 'question 5',
    answers: [{id: 'a', answer: 'aaaa'}, {id: 'b', answer: 'bbbb'}, {id: 'c', answer: 'cccc'}, {id: 'd', answer: 'dddd'}],
    correctAnswer: ['a', 'b'],
  }
]

const result: string[] = [];
console.log('result -', result);
const IndexQuestion = 1;

const handlerClickOnAnswer = (e: React.MouseEvent<HTMLLIElement>) => {
  const targetId = (e.target as HTMLLIElement).id;
  const result = { userResponse: targetId, correctAnswer: data[IndexQuestion].correctAnswer.join(', ') };
  console.log('result -', result);
}

const QuizPage = () => {
  console.log('----- QuizPage')
  return (
    <main className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <section className="col-12 col-md-8 col-xxl-6">
          <QuestionsProgress now={Math.round(1/4*100)} CurrentQuestion={1} TotalQuestions={4} />
          <div className="card shadow-sm my-3 px-2">
            <ListGroup as="ul" className="text-center">
                <p className="py-2 border-bottom fw-semibold fs-4">
                  {`${data[IndexQuestion].question}:`}
                </p>
                {
                data[IndexQuestion].answers.map((item) => (
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
              <Button variant="success" className="mx-4">Следующий</Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default QuizPage;
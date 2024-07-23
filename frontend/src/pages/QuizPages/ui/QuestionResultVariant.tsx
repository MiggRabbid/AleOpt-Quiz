import { ListGroup, ListGroupItem } from 'react-bootstrap';

import { iQuestion } from '../../../types/iQuiz';
import { iUserAnswer } from '../../../types/iUser';

interface QuestionsResultVariantProps {
  currQuestion: iQuestion;
  userAnswer: iUserAnswer;
}

const QuestionsResultVariant: React.FC<QuestionsResultVariantProps> = (
  props,
) => {
  const { currQuestion, userAnswer } = props;
  console.group('----- QuestionsResultVariant');
  const { id, question, answers, correctAnswerId } = currQuestion;
  const { result, userAnswerId } = userAnswer;

  const correctAnswer = answers.filter(
    (item) => item.id === correctAnswerId,
  )[0];
  const currentAnswer = answers.filter((item) => item.id === userAnswerId)[0];
  console.groupEnd();
  return (
    <ListGroup className="text-center d-flex flex-column">
      <ListGroupItem className="px-2 fw-semibold fs-8">{`${id} - ${question}`}</ListGroupItem>

      <ListGroupItem
        variant="Light"
        className="w-100 py-3 fw-medium fs-8 text-start"
      >
        {`${correctAnswer.id.toUpperCase()}: ${correctAnswer.answer}`}
      </ListGroupItem>

      <ListGroupItem
        variant={result === 0 ? 'danger' : 'success'}
        className="w-100 py-3 fw-medium fs-8 text-start"
      >
        {`${currentAnswer.id.toUpperCase()}: ${currentAnswer.answer}`}
      </ListGroupItem>
    </ListGroup>
  );
};

export default QuestionsResultVariant;

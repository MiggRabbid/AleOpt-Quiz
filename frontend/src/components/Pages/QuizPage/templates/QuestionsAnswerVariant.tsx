import { ListGroupItem } from 'react-bootstrap';

import { typeQuestionAnswer } from '../../../../models/types';

interface QuestionsAnswerVariantProps {
  item: typeQuestionAnswer;
  active: boolean;
  onClick: React.MouseEventHandler<HTMLElement>;
}

const QuestionsAnswerVariant: React.FC<QuestionsAnswerVariantProps> = (
  props,
) => {
  const { item, active, onClick } = props;
  return (
    <ListGroupItem
      data-id={item.questionId}
      data-variant={item.id}
      action
      active={active}
      variant="success"
      onClick={onClick}
      className="w-100 py-3 fw-medium fs-5 text-start rounded-2 border-1"
    >
      {`${item.id.toUpperCase()}: ${item.answer}`}
    </ListGroupItem>
  );
};

export default QuestionsAnswerVariant;

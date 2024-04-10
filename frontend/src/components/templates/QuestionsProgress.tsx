import { ProgressBar } from 'react-bootstrap';

interface QuestionsProgressProps {
  now: number;
  CurrentQuestion: number;
  TotalQuestions: number;
}

const QuestionsProgress: React.FC<QuestionsProgressProps> = ({now, CurrentQuestion, TotalQuestions}) => {
  return (
    <div className="mb-2">
      <ProgressBar variant="success" animated now={now} label={`${CurrentQuestion} из ${TotalQuestions}`} />
    </div>
  );
};

export default QuestionsProgress;
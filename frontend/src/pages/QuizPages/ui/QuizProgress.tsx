import { ProgressBar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

interface QuestionsProgressProps {
  now: number;
  CurrentQuestion: number;
  TotalQuestions: number;
}

const QuestionsProgress: React.FC<QuestionsProgressProps> = ({
  now,
  CurrentQuestion,
  TotalQuestions,
}) => {
  const { t } = useTranslation();

  return (
    <div className="mb-2">
      <ProgressBar
        className="fs-6 fs-lg-5"
        variant="success"
        now={now}
        label={`${CurrentQuestion}${t('quizPage.quizProgress.from')}${TotalQuestions}`}
      />
    </div>
  );
};

export default QuestionsProgress;

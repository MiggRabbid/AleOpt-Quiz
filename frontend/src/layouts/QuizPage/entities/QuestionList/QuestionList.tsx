import { QuestionListClientWrapper } from './QuestionListClientWrapper';
import { IQuestionListProps } from '../../QuizPage.types';

const QuestionList = (props: IQuestionListProps) => {
  return (
    <div id="QuestionList" className="flex h-full w-full items-center justify-center">
      <QuestionListClientWrapper {...props} />
    </div>
  );
};

export default QuestionList;

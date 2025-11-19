// Компоненты
import UserProfileForQuizClientWrapper from './UserProfileForQuizClientWrapper';
// Типизация
import { IUserProfileForQuizProps } from './UserProfileForQuiz.types';

const UserProfileForQuiz = (props: IUserProfileForQuizProps) => {
  return (
    <div className="flex h-full w-full flex-col justify-between gap-5.5">
      <UserProfileForQuizClientWrapper {...props} />
    </div>
  );
};

export { UserProfileForQuiz };

import { ReactNode } from 'react';

interface IUserProfileClientWrapperProps {
  ProfileCard: ReactNode;
  SummaryResults: ReactNode;
  BtnStartQuiz: ReactNode;
}

export const UserProfileClientWrapper = ({
  ProfileCard,
  SummaryResults,
  BtnStartQuiz,
}: IUserProfileClientWrapperProps) => {
  return (
    <>
      <div className="flex h-fit w-full flex-col justify-start gap-3.5">
        {ProfileCard}

        {SummaryResults}
      </div>

      {BtnStartQuiz}
    </>
  );
};

import React from 'react';

import UserStats from '../../../../entities/users/UserStats/UserStats';
import ContinueQuizCard from './ContinueQuizCard';
import CurrUserCard from './CurrUserCard';
import StartQuizCard from './StartQuizCard';

import { typeApiResponse } from '../../../../types/types';
import { iUser, iUserAnswer } from '../../../../types/iUser';

interface iWatchStatsProps {
  unfinishedAttempt: { answers: iUserAnswer[] };
  authUser: iUser | null;
  headers: typeApiResponse;
}

const WatchStats: React.FC<iWatchStatsProps> = (props) => {
  const { unfinishedAttempt, authUser, headers } = props;
  return (
    <div className="mt-4">
      <div className="col-12 d-flex flex-column flex-lg-row align-items-center justify-content-center gap-4">
        <div className="col-12 col-lg-5">
          <CurrUserCard />
        </div>
        <div className="col-12 col-lg-6 d-flex flex-column">
          {!!unfinishedAttempt && unfinishedAttempt.answers.length > 0 ? (
            <ContinueQuizCard />
          ) : (
            <StartQuizCard />
          )}
        </div>
      </div>{' '}
      {!!authUser && <UserStats username={authUser?.username} headers={headers} />}
    </div>
  );
};

export default React.memo(WatchStats);

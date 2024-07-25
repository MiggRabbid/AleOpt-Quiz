import React from 'react';
import { Accordion, Form, InputGroup } from 'react-bootstrap';

import UserChangeButtonsGroup from '../../../shared/components/buttons/ChangeButtonsGroup';

import { iUser } from '../../../types/iUser';
import { typeApiResponse } from '../../../types/types';
import useAuth from '../../../hooks/useAuth';
import { useGetUserStatsQuery } from '../../../app/store/api/stats.api';
import UserStats from '../../../entities/users/UserStats/UserStats';

interface iUserAccordionBodyProps {
  user: iUser;
}

const UserAccordionBody: React.FC<iUserAccordionBodyProps> = (props) => {
  const { user } = props;
  const { getAuthHeader } = useAuth();
  const headers = getAuthHeader() as typeApiResponse;

  const {
    data: userStats,
    error: requestError,
    isFetching,
  } = useGetUserStatsQuery({
    headers,
    params: { username: user.username },
  });

  return (
    <Accordion.Body>
      <div className="w-100 mt-2 mb-4 d-flex flex-row justify-content-between align-items-center">
        <InputGroup className="w-auto me-5">
          <InputGroup.Text id="role">Роль: </InputGroup.Text>
          <Form.Control
            value={user.role}
            placeholder={user.role}
            aria-label="role"
            aria-describedby="role"
            disabled
          />
          <InputGroup.Text id="username">Username:</InputGroup.Text>
          <Form.Control
            value={user.username}
            placeholder={user.username}
            aria-label="Username"
            aria-describedby="username"
            disabled
          />
        </InputGroup>
        <UserChangeButtonsGroup data={user} />
      </div>
      <div className="w-100 d-flex flex-row justify-content-between align-items-center">
        {(!userStats && !isFetching) || !!requestError ? null : (
          <UserStats username={user?.username} headers={headers} />
        )}
      </div>
    </Accordion.Body>
  );
};

export default React.memo(UserAccordionBody);

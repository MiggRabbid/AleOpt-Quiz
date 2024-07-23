import React from 'react';
import { Accordion, Form, InputGroup } from 'react-bootstrap';

import UserChangeButtonsGroup from '../../../shared/components/buttons/ChangeButtonsGroup';

import { iUser } from '../../../types/iUser';

interface iUserAccordionBodyProps {
  user: iUser;
}

const UserAccordionBody: React.FC<iUserAccordionBodyProps> = (props) => {
  const { user } = props;

  return (
    <Accordion.Body>
      <div className="w-100 d-flex flex-row justify-content-between align-items-center">
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
    </Accordion.Body>
  );
};

export default React.memo(UserAccordionBody);

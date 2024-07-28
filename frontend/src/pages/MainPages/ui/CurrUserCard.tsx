import React, { useEffect, useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getCurrUser } from '../../../selectors/usersSelector';

interface iUseState {
  firstName: string;
  lastName: string;
}

const CurrUserCard = () => {
  const curUser = useSelector(getCurrUser);
  const { t } = useTranslation();

  const [inputValue, setInputValue] = useState<iUseState>({
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    if (!!curUser) {
      setInputValue({
        firstName: curUser.firstName || 'нет данных',
        lastName: curUser.lastName || 'нет данных',
      });
    }
  }, []);

  return (
    <article className="w-100 px-3 d-flex flex-column align-items-center justify-content-center">
      <h3 className="w-100 text-uppercase text-center p-0 pb-3 top-0 fw-semibold">
        {curUser?.username}
        {t('mainPage.title')}
      </h3>
      <div className="w-100 p-4 fs-5 card shadow-sm sd-flex flex-column gap-3">
        <div className="w-100 d-flex flex-row justify-content-center align-items-center gap-2">
          <InputGroup>
            <InputGroup.Text className="fs-5" id="role">
              {t('mainPage.inputs.firstName')}
            </InputGroup.Text>
            <Form.Control
              value={inputValue?.firstName}
              placeholder={curUser?.firstName}
              aria-label="role"
              aria-describedby="role"
              disabled
              className="fs-5"
            />
          </InputGroup>
          <InputGroup>
            <InputGroup.Text className="fs-5" id="username">
              {t('mainPage.inputs.lastName')}
            </InputGroup.Text>
            <Form.Control
              value={inputValue?.lastName}
              placeholder={curUser?.lastName}
              aria-label="Username"
              aria-describedby="username"
              disabled
              className="fs-5"
            />
          </InputGroup>
        </div>
      </div>
    </article>
  );
};

export default React.memo(CurrUserCard);

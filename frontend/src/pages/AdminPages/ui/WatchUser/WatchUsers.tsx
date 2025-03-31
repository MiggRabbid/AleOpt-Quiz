import React from 'react';
import { Accordion } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import useActions from '../../../../hooks/useActions';

import MainButton from '../../../../shared/components/buttons/MainButton';
import UserAccordionBody from './UserAccordionBody';

import { iUser, UserRoles } from '../../../../types/iUser';
import { FabricModalType } from '../../../../types/iModal';

const getAdminRole = (role: string) => {
  switch (role) {
    case UserRoles.Admin:
      return ` - ${UserRoles.Admin}`;
    case UserRoles.Owner:
      return ` - ${UserRoles.Owner}`;
    default:
      return '';
  }
};

const WatchUsers: React.FC<{ users: iUser[] | undefined }> = (props) => {
  const { users } = props;
  const { t } = useTranslation();
  const { openModal } = useActions();

  return (
    <section
      className="h-100 py-4 d-flex flex-column align-items-center"
      style={{
        minHeight: 'calc(100vh - 82px - 8px - 8px - 64px)',
      }}
      id="adminUsers"
    >
      <div className="col-11 mb-3 d-flex flex-row justify-content-between align-items-center">
        <h1 className="w-100 ms-3 me-2 text-uppercase text-start fw-bold fs-4 fs-lg-3">
          {t('adminPage.users.title')}
        </h1>
        <MainButton
          text={t('adminPage.users.btnNewUser')}
          onClick={() => openModal({ modalType: FabricModalType.newUser })}
        />
      </div>
      <Accordion
        defaultActiveKey="0"
        flush
        className="col-12 col-lg-10 border rounded overflow-hidden"
      >
        {users?.map((user) => {
          return (
            <Accordion.Item key={user.username} eventKey={user.username}>
              <Accordion.Header>{`${user.firstName} ${user.lastName}${getAdminRole(user.role)}`}</Accordion.Header>
              <UserAccordionBody user={user} />
            </Accordion.Item>
          );
        })}
      </Accordion>
    </section>
  );
};

export default WatchUsers;

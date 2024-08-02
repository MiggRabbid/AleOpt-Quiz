import { useSelector } from 'react-redux';
import { Accordion } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { getAllUsers } from '../../../../selectors/usersSelector';
import useActions from '../../../../hooks/useActions';

import MainButton from '../../../../shared/components/buttons/MainButton';
import UserAccordionBody from './UserAccordionBody';

import { iUser } from '../../../../types/iUser';
import { FabricModalType } from '../../../../types/iModal';

const WatchUsers = () => {
  const { t } = useTranslation();
  const { openModal } = useActions();
  const users: iUser[] | null = useSelector(getAllUsers);

  return (
    <section
      className="h-100 py-4 d-flex flex-column align-items-center"
      style={{
        minHeight: 'calc(100vh - 82px - 8px - 8px - 64px)',
      }}
      id="adminUsers"
    >
      <div className="col-10 mb-3 d-flex flex-row justify-content-between align-items-center">
        <h1 className="text-uppercase text-start fw-bold fs-3">{t('adminPage.users.title')}</h1>
        <MainButton
          text={t('adminPage.users.btnNewUser')}
          onClick={() => openModal({ modalType: FabricModalType.newUser })}
        />
      </div>
      <Accordion
        defaultActiveKey="0"
        flush
        className="col-12 col-md-11 col-xl-10 border rounded overflow-hidden"
      >
        {users?.map((user) => {
          return (
            <Accordion.Item key={user.username} eventKey={user.username}>
              <Accordion.Header>{`${user.firstName} ${user.lastName}`}</Accordion.Header>
              <UserAccordionBody user={user} />
            </Accordion.Item>
          );
        })}
      </Accordion>
    </section>
  );
};

export default WatchUsers;

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
  console.group('----- WatchUsers');
  const { t } = useTranslation();
  const { openModal } = useActions();
  const users: iUser[] | null = useSelector(getAllUsers);

  console.groupEnd();
  return (
    <section
      className="h-100 px-4 d-flex flex-column align-items-center"
      style={{
        minHeight: 'calc(100vh - 96px - 8px - 8px - 66px)',
      }}
      id="adminUsers"
    >
      <div className="h-100 w-100 my-4 position-relative bg-body-tertiary">
        <h1 className="mx-auto text-uppercase text-center fw-bold fs-3">
          {t('adminPage.users.title')}
        </h1>
        <div className="position-absolute top-50 translate-middle-y end-0 me-3">
          <MainButton
            text={t('adminPage.users.btnNewUser')}
            onClick={() => openModal({ modalType: FabricModalType.newUser })}
          />
        </div>
      </div>
      <Accordion defaultActiveKey="0" flush className="w-100 border rounded overflow-hidden">
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

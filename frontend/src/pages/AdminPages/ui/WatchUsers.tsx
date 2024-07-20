import { useSelector } from 'react-redux';
import { Accordion } from 'react-bootstrap';

import getAllUsers from '../../../selectors/usersSelector';
import useActions from '../../../hooks/useActions';

import MainButton from '../../../shared/components/buttons/MainButton';
import UserAccordionBody from './UserAccordionBody';

import { iUser } from '../../../types/interfaces/iUser';
import { FabricModalType } from '../../../types/interfaces/iModal';

const WatchUsers = () => {
  console.group('----- WatchUsers');

  const { openModal } = useActions();
  const users: iUser[] | null = useSelector(getAllUsers);

  console.groupEnd();
  return (
    <section
      className="h-100 d-flex flex-column align-items-center"
      style={{
        minHeight: 'calc(100vh - 96px - 8px - 8px - 66px)',
      }}
      id="adminUsers"
    >
      <div className="h-100 w-100 my-4 position-relative bg-body-tertiary">
        <h1 className="mx-auto text-uppercase text-center fw-bold fs-3">
          Сотрудники АлёОпт
        </h1>
        <div className="position-absolute top-50 translate-middle-y end-0 me-3">
          <MainButton
            text="Новый пользователь"
            onClick={() => openModal({ modalType: FabricModalType.NewUser })}
          />
        </div>
      </div>
      <Accordion
        defaultActiveKey="0"
        flush
        className="col-10 border rounded overflow-hidden"
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

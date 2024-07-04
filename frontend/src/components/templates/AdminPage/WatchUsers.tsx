import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Accordion } from 'react-bootstrap';

import CreateNewUser from './CreateNewUser';
import getAllUsers from '../../../selectors/usersSelector';

import MainButton from '../../ui/MainButton';
import UserChangeButtonsGroup from '../../ui/UserChangeButtonsGroup';
import useActions from '../../../hooks/useActions';
import { getNewUserModalState } from '../../../selectors/modalSelectors';

const WatchUsers = () => {
  console.group('----- WatchUsers');
  const { changeNewUserModalState } = useActions();
  const users = useSelector(getAllUsers);
  const newUserModalState = useSelector(getNewUserModalState);

  useEffect(() => {
    console.log('newUserModalState -', newUserModalState);
  }, [newUserModalState]);

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
            onClick={() => changeNewUserModalState()}
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
              <Accordion.Header>
                {`${user.firstName} ${user.lastName}`}
              </Accordion.Header>
              <Accordion.Body className="d-flex justify-content-between align-items-center">
                <div className="w-100 d-flex">
                  <p className="col-6 text-center">логин - {user.username}</p>
                  <p className="col-6 text-center">роль - {user.role}</p>
                </div>
                <UserChangeButtonsGroup />
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
      <CreateNewUser
        modalState={newUserModalState}
        setModalState={changeNewUserModalState}
      />
    </section>
  );
};

export default WatchUsers;

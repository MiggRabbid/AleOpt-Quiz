import { useEffect, useState } from 'react';
import { Accordion, Spinner } from 'react-bootstrap';

import useAuth from '../../../hooks/useAuth';
import { useLazyGetAllUsersQuery } from '../../../store/users.api';

import { typeApiResponse } from '../../../models/types';
import MainButton from '../../ui/MainButton';
import CreateNewUser from './CreateNewUser';

const WatchUsers = () => {
  console.group('----- WatchUsers');
  const { getAuthHeader } = useAuth();
  const headers = getAuthHeader() as typeApiResponse;
  const [getAllUsers, { data: users, isLoading: isLoadingUsers }] =
    useLazyGetAllUsersQuery();
  const [modalState, setModalState] = useState(false);
  useEffect(() => {
    getAllUsers(headers);
  }, []);

  console.groupEnd();
  return (
    <section className="h-100 d-flex flex-column align-items-center">
      <div className="w-100 h-auto my-4 position-relative bg-body-tertiary">
        <h1 className="mx-auto text-uppercase text-center fw-bold fs-3">
          Сотрудники АлёОпт
        </h1>
        <div className="position-absolute top-50 translate-middle-y end-0 me-3">
          <MainButton
            text="Новый пользователь"
            onClick={() => setModalState(!modalState)}
          />
        </div>
      </div>
      {isLoadingUsers ? (
        <Spinner animation="border" variant="primary" className="mx-auto" />
      ) : (
        <>
          {' '}
          <Accordion
            defaultActiveKey="0"
            flush
            className="col-10 border rounded overflow-hidden"
          >
            {users?.map((user) => {
              return (
                <Accordion.Item key={user.username} eventKey={user.username}>
                  <Accordion.Header>
                    <h6>{`${user.firstName} ${user.lastName}`}</h6>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="d-flex border-bottom">
                      <p className="col-6">логин - {user.username}</p>
                      <p className="col-6">роль - {user.role}</p>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </>
      )}
      <CreateNewUser modalState={modalState} setModalState={setModalState} />
    </section>
  );
};

export default WatchUsers;

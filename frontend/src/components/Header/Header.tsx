/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Navbar, NavbarBrand } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import routes from '../../routes';
import useAuth from '../../hooks/useAuth';
import useActions from '../../hooks/useActions';

import Logo from '../../assets/logo-header.png';

const Header = () => {
  console.group('----- Header');
  const navigate = useNavigate();
  const { logout } = useActions();
  const { user, useLogout } = useAuth();

  console.log('user -', user);

  const handleLogout = () => {
    useLogout();
    logout();
    console.groupEnd();
    navigate(routes.loginPagePath());
  };

  console.groupEnd();
  return (
    <header className="container-xxl d-flex justify-content-center p-0 mb-2">
      <div className="w-100 rounded-bottom shadow-sm bg-light-subtle">
        <Navbar className="d-flex justify-content-between">
          <NavbarBrand
            className="col-3 m-0 d-flex justify-content-center"
            style={{ minWidth: '170px', maxWidth: '250px' }}
          >
            <img
              src={Logo}
              alt="АлёОпт - лучший магазин аксессуаров для телефонов в Новороссийске"
              height="70"
            />
          </NavbarBrand>

          {!!user && (
            <Button
              type="submit"
              variant="success"
              onClick={handleLogout}
              className="me-3"
              style={{ height: '50px', width: '100px' }}
            >
              Выйти
            </Button>
          )}
        </Navbar>
      </div>
    </header>
  );
};

export default Header;

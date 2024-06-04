/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Navbar, NavbarBrand } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import routes from '../../routes';
import useAuth from '../../hooks/useAuth';
import useActions from '../../hooks/useActions';

import Logo from '../../assets/logo-header.png';

const Header = () => {
  console.log('----- Header');
  const navigate = useNavigate();
  const { logout } = useActions();
  const { user, useLogout } = useAuth();

  const handleLogout = () => {
    useLogout();
    logout();
    navigate(routes.loginPagePath());
  };

  return (
    <header className="d-flex justify-content-center">
      <div className="container-xxl rounded-bottom shadow-sm">
        <Navbar className="col-11 mx-auto d-flex justify-content-between">
          <NavbarBrand>
            <img
              src={Logo}
              alt="АлёОпт - лучший магазин аксессуаров для телефонов в Новороссийске"
              height="70"
            />
          </NavbarBrand>

          {!!user && (
            <Button
              type="submit"
              variant="outline-success"
              onClick={handleLogout}
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

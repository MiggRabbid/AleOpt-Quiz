/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Navbar, NavbarBrand } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import routes from '../../app/routes';
import useAuth from '../../hooks/useAuth';
import useActions from '../../hooks/useActions';

import Logo from '../../assets/logo-header.png';

const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { logout, clearCurrentResult } = useActions();
  const { authUser, userLogout } = useAuth();

  const handleLogout = () => {
    clearCurrentResult();
    userLogout();
    logout();
    navigate(routes.loginPagePath());
  };

  return (
    <header className="container-fluid d-flex justify-content-center p-0 mx-0">
      <div className="col-12 col-xxl-11 rounded-bottom shadow-lg bg-light-subtle">
        <Navbar className="p-0 d-flex justify-content-between">
          <NavbarBrand
            className="py-1 col-3 m-0 d-flex justify-content-start align-items-center"
            style={{ minWidth: '120px', maxWidth: '200px' }}
          >
            <Button onClick={() => navigate(routes.MainPagePath())} variant="outline-light">
              <img src={Logo} alt={t('header.imgAlt')} height="60" />
            </Button>
          </NavbarBrand>

          {!!authUser && (
            <Button
              type="submit"
              variant="success"
              onClick={handleLogout}
              className="me-3"
              style={{ height: '50px', width: '100px' }}
            >
              {t('header.logoutBtn')}
            </Button>
          )}
        </Navbar>
      </div>
    </header>
  );
};

export default Header;

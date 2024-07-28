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
  const { user, userLogout } = useAuth();

  const handleLogout = () => {
    clearCurrentResult();
    userLogout();
    logout();
    navigate(routes.loginPagePath());
  };

  return (
    <header className="container-xxl d-flex justify-content-center p-0 mx-0">
      <div className="w-100 rounded-bottom shadow-sm bg-light-subtle">
        <Navbar className="p-0 d-flex justify-content-between">
          <NavbarBrand
            className="py-1 col-3 m-0 d-flex justify-content-center align-items-center"
            style={{ minWidth: '170px', maxWidth: '250px' }}
          >
            <Button onClick={() => navigate(routes.MainPagePath())} variant="outline-light">
              <img src={Logo} alt={t('header.imgAlt')} height="60" />
            </Button>
          </NavbarBrand>

          {!!user && (
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

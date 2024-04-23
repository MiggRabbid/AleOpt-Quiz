import {Button, Navbar, NavbarBrand } from "react-bootstrap";

import Logo from '../../assets/logo-header.png';
import routes from "../../routes";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    console.log('--- Header - handleLogout')
    logOut();
    navigate(routes.loginPagePath());
  };

  return (
    <header className="d-flex justify-content-center">
      <div className="container-xxl rounded-bottom shadow-sm">
        <Navbar className="col-11 mx-auto d-flex justify-content-between">
          <NavbarBrand>
            <img src={Logo} alt="АлёОпт - лучший магазин аксессуаров для телефонов в Новороссийске" height="70"/>
          </NavbarBrand>
          

          {user && (
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
  )
};

export default Header;
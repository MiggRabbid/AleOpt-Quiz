import {Button, Navbar, NavbarBrand } from "react-bootstrap";

import Logo from '../../assets/logo-header.png';
import routes from "../../routes";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut();
    navigate(routes.MainPagePath());
  };

  return (
    <header className="d-flex justify-content-center">
      <div className="container-xxl rounded-bottom shadow-sm px-3">
        <Navbar className="d-flex justify-content-between">
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
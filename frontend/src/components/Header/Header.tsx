import {Navbar, NavbarBrand } from "react-bootstrap";

import Logo from '../../assets/logo-header.png';

const Header = () => {
  console.log('----- Header');

  return (
    <header className="d-flex justify-content-center">
      <div className="container-xxl rounded-bottom shadow-sm d-flex flex-row justify-content-between px-3">
        <h1 className="visually-hidden">"АлёОпт" - лучший магазин аксессуаров для телефонов в Новороссийске</h1>
        <Navbar className="d-flex justify-content-between">
          <NavbarBrand>
            <img src={Logo} alt="АлёОпт" height="70"/>
          </NavbarBrand>
        </Navbar>
        </div>
    </header>
  )
};

export default Header;
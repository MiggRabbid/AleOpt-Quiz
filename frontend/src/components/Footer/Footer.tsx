import { Container, Navbar, NavbarBrand, Nav, NavLink, } from "react-bootstrap";

import Logo from '../../assets/logo-header.png';
import VkIcon from '../../assets/vk-icon.png'
import TgIcon from '../../assets/tg-icon.png'
import InIcon from '../../assets/in-icon.png'

const Footer = () => {
  console.log('----- Header');

  return (
    <footer className="d-flex justify-content-center">
      <div className="container-xxl py-1 px-3">
        <Navbar className="d-flex flex-row justify-content-between ">
          <Container>

            <NavbarBrand>
              <h5 className="fw-semibold text-uppercase">Лучший магазин аксессуаров для телефонов в Новороссийске</h5>
            </NavbarBrand>

            <Nav>
              <NavLink target="_blank" href="https://t.me/aleopt_ru"><img src={TgIcon} alt="АлёОпт в ВК" height="20"/></NavLink>
              <NavLink target="_blank" href="https://vk.com/aleopt_ru"><img src={VkIcon} alt="АлёОпт в ВК" height="20"/></NavLink>
              <NavLink target="_blank" href="https://www.instagram.com/aleopt.ru/"><img src={InIcon} alt="АлёОпт в ВК" height="20"/></NavLink>
            </Nav>

          </Container>
        </Navbar>
      </div>
    </footer>
  )
};

export default Footer;
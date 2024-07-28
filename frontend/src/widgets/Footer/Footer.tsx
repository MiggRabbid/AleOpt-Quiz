import { Container, Navbar, NavbarBrand, Nav, NavLink } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import VkIcon from '../../assets/vk-icon.png';
import TgIcon from '../../assets/tg-icon.png';
import InIcon from '../../assets/in-icon.png';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="container-xxl d-flex justify-content-center p-0 m-0">
      <div className="container-xxl py-1 px-3 bg-light rounded-top">
        <Navbar className="d-flex flex-row justify-content-between ">
          <Container>
            <NavbarBrand>
              <h5 className="fw-semibold text-uppercase text-wrap text-center">
                {t('footer.title')}
              </h5>
            </NavbarBrand>

            <Nav>
              <NavLink target="_blank" href="https://t.me/aleopt_ru">
                <img src={TgIcon} alt={t('footer.iconTg')} height="20" />
              </NavLink>
              <NavLink target="_blank" href="https://vk.com/aleopt_ru">
                <img src={VkIcon} alt={t('footer.iconVk')} height="20" />
              </NavLink>
              <NavLink target="_blank" href="https://www.instagram.com/aleopt.ru/">
                <img src={InIcon} alt={t('footer.iconIn')} height="20" />
              </NavLink>
            </Nav>
          </Container>
        </Navbar>
      </div>
    </footer>
  );
};

export default Footer;

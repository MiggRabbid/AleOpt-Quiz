import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import routes from '../../routes';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3">
          <span className="text-danger">Упс! </span>
          Страница не найдена
        </p>
        <p className="lead">Но вы можете перейти на главную страницу</p>
        <br />
        <Button
          variant="outline-dark"
          onClick={() => navigate(routes.MainPagePath())}
        >
          Вернуться
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

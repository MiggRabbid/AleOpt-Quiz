import { Badge } from 'react-bootstrap';

const getBadgeStyle = (numberAttempts: number): string => {
  if (numberAttempts >= 66) {
    return 'success';
  }
  if (numberAttempts <= 50) {
    return 'danger';
  }
  return 'warning';
};

const UserStatBadge: React.FC<{ averageResult: number }> = (props) => {
  const { averageResult } = props;
  return (
    <Badge bg={getBadgeStyle(averageResult)} className="ms-2 py-2 px-4 fs-6">
      {averageResult}%
    </Badge>
  );
};

export default UserStatBadge;

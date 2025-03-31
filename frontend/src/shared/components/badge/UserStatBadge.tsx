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
    <Badge bg={getBadgeStyle(averageResult)} className="fs-6 px-3 py-2 text-center py-1">
      {averageResult}%
    </Badge>
  );
};

export default UserStatBadge;

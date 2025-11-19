import { iUser } from '@/types/staff.types';
import { iUserStats } from '@/types/stats.types';

export interface IAdminProfileProps {
  user: iUser | null;
  results: iUserStats[] | null;
}

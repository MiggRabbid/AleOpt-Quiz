import { iQuestion } from '@/types/quiz.types';
import { iUser } from '@/types/staff.types';

export interface IAdminStatsProps {
  users: iUser[] | null;
  questions: iQuestion[] | null;
}

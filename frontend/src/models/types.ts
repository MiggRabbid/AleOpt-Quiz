export type typeData = { [key: string]: string };

export type typeQuestionAnswer = {
  questionId: string;
  id: string;
  answer: string;
};

export type typeAuthState = {
  isAuthenticated: boolean;
  error: { name: string; message: string } | null;
};

export type typeModalState = {
  showNewUserModal: boolean;
  showNewQuestionModal: boolean;
};

export type typeApiResponse = {
  [key: string]: string;
};

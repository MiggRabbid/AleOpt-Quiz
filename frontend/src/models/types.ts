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
  show: boolean;
  modalType: string | null;
};

export type typeApiResponse = {
  [key: string]: string;
};

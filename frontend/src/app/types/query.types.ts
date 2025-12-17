import type { iQuestion } from '@app/types';

export interface IGetUserDataRequest {
  params: {
    username: string;
  };
}

export interface IEditUserDataRequest<T> extends IGetUserDataRequest {
  query: T;
}

export interface IQuestionRequest {
  params: {
    id: string;
  };
}

export interface IEditQuestionRequest extends IQuestionRequest {
  query: iQuestion;
}

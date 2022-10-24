export enum ROUTS_LIST {
  COURSES_PAGE = 'courses',
  LOGIN_PAGE = 'login',
  REGISTRATION_PAGE = 'registration',
}

export enum LOGIN_RQ_STATUS {
  BAD_RQ_ERROR = 'Incorrect input data!',
  RQ_SUCCESS = 'Success!',
}

export enum TEMPLATE_STRINGS {
  EMAIL_REQUIRED = 'Email is required',
  NAME_REQUIRED = 'Name is required',
  PASSWORD_REQUIRED = 'Password is required',
  DESCRIPTION_REQUIRED = 'Description is required',
  TITLE_REQUIRED = 'Title is required',
  DURATION_REQUIRED = 'Duration is required',
  DURATION_MIN = 'Duration should be at least 0',
  PASSWORD_LENGTH = 'Password length must be at least 8 characters',
}

export interface Account {
  name?: string;
  email?: string;
  password?: string;
  accessToken?: string;
  role?: string;
}

export interface Request200<T> {
  successful: true;
  result: T;
}

export interface Request400 {
  successful: false;
  message?: string;
  errors?: string[];
}

export interface Author {
  id?: string;
  name: string;
}

export const ACCOUNT_DEFAULT = {
  name: '',
  email: '',
  password: '',
  accessToken: '',
  role: '',
};

export const HIDE_PASSWORD_FLAG = true;
export const HIDDEN_PASSWORD_INPUT_TYPE = 'password';
export const NOT_HIDDEN_PASSWORD_INPUT_TYPE = 'text';

export const LOWER_THRESHOLD_FOR_RANDOM_ID = 1;
export const UPPER_THRESHOLD_FOR_RANDOM_ID = 15;

export const ACCOUNT_MOCK_REG_DATA = {
  name: '',
  email: 'admin@email.com',
  password: 'admin123',
};

export const ACCOUNT_MOCK_DATA = {
  account_id: '1',
  account_nickname: '@Tester@',
  account_email: 'tester@gmail.com',
  account_password: 'qwerty1234',
  account_status: 'user',
};

export interface SearchCourseField {
  title: string;
}

export const passwordView = (flag: boolean) => {
  return !flag;
};

export const randomInteger = (min: number, max: number) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand).toString();
};

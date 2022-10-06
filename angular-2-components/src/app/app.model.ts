export enum ROUTS_LIST {
  COURSES_PAGE = 'courses',
  LOGIN_PAGE = 'login',
  REGISTRATION_PAGE = 'REGISTRATION',
}

export interface Account {
  account_id: string;
  account_nickname: string;
  account_email: string;
  account_password: string;
  account_status: string;
}

export const ACCOUNT_DEFAULT = {
  account_id: '',
  account_nickname: '',
  account_email: ',CHECK',
  account_password: '',
  account_status: '',
};

export const HIDE_PASSWORD_FLAG = true;

export const ACCOUNT_MOCK_DATA = {
  account_id: '1',
  account_nickname: '@Tester@',
  account_email: 'tester@gmail.com',
  account_password: 'qwerty1234',
  account_status: 'user',
};

export const passwordView = (flag: boolean) => {
  return !flag;
};

export const randomInteger = (min: number, max: number) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand).toString();
};

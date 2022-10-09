export interface LoginParams {
  username: string;
  password: string;
  captcha: string;
  uuid: string;
}

export interface LoginResult {
  token: string;
}

export interface CaptchaResult {
  captchaBASE64: string;
  uuid: string;
}

export interface UserInfo {
  id: number;
  username: string;
  password: string;
  phone: string;
  email: string;
  userStatus: number;
  avatar: string;
  createTime: number;
  updateTime: number;
}

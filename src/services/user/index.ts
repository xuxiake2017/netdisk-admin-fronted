import { get, postJSON } from '@/utils/request';

import type { LoginParams, LoginResult, CaptchaResult, UserInfo } from './typings';

export const getCaptcha = () => {
  return get<RequestData<CaptchaResult>>('/user/getCaptcha');
};

export const login = (params: LoginParams) => {
  return postJSON<RequestData<LoginResult>>('/user/login', params);
};

export const getInfo = () => {
  return get<RequestData<UserInfo>>('/user/getInfo');
};

export const logout = () => {
  return get('/user/logout');
};

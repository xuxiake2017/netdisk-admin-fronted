import { postJSON } from '@/utils/request';

import type {
  UserListQueryParams,
  UserListItem,
  WeChatUserListQueryParams,
  WeChatUser,
} from './typings';

export const getUserList = (params: UserListQueryParams) => {
  return postJSON<RequestData<PageInfo<UserListItem>>>('/userManage/getUserList', params);
};

export const getWeChatUserList = (params: WeChatUserListQueryParams) => {
  return postJSON<RequestData<PageInfo<WeChatUser>>>('/userManage/getWeChatUserList', params);
};

import type { UserStatus, Sex } from '../constant';
import type { CommonDataStatus } from '@/constant';

export interface UserListQueryParams extends CommonPageParams {
  searchText?: string;
  userStatus?: UserStatus;
  sex?: Sex;
  startTime?: number;
  endTime?: number;
  dateRange?: string[];
}

export interface UserListItem {
  id: number;
  username: string;
  password: string;
  sex: Sex;
  realName: string;
  regTime: number;
  totalMemory: number;
  usedMemory: number;
  phone: string;
  email: string;
  userStatus: UserStatus;
  avatar: string;
  signature: string;
  nickName: string;
}

export interface WeChatUserListQueryParams extends CommonPageParams {
  searchText?: string;
  gender?: Sex;
  status?: CommonDataStatus;
  startTime?: number;
  endTime?: number;
  dateRange?: string[];
}

export interface WeChatUser {
  id: number;
  avatarUrl: string;
  city: string;
  country: string;
  gender: Sex;
  language: string;
  nickName: string;
  province: string;
  openid: string;
  userId: number;
  status: CommonDataStatus;
  createTime: number;
  updateTime: number;
  user?: UserListItem;
}

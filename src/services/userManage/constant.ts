/**
 * 用户状态
 */
export enum UserStatus {
  /** 用户状态-普通用户 */
  USER_STATUS_NORMAL = 0,
  /** 用户状态-不存在（已删除） */
  USER_STATUS_NOT_EXIST = 1,
  /** 用户状态-VIP用户 */
  USER_STATUS_VIP = 2,
  /** 用户状态-被管理员删除 */
  USER_STATUS_DEL_BY_ADMIN = 3,
  /** 用户状态-未激活 */
  USER_STATUS_NOT_VERIFY = 9,
}

export const UserStatusMap = {
  [UserStatus.USER_STATUS_NORMAL]: '普通用户',
  [UserStatus.USER_STATUS_NOT_EXIST]: '已删除',
  [UserStatus.USER_STATUS_VIP]: 'VIP用户',
  [UserStatus.USER_STATUS_DEL_BY_ADMIN]: '被管理员删除',
  [UserStatus.USER_STATUS_NOT_VERIFY]: '未激活',
};

/**
 * 性别 0：未知、1：男、2：女
 */
export enum Sex {
  /** 0：未知 */
  UNKNOWN = 0,
  /** 1：男 */
  MALE,
  /** 2：女 */
  FEMALE,
}

export const SexMap = {
  [Sex.UNKNOWN]: '未知',
  [Sex.MALE]: '男',
  [Sex.FEMALE]: '女',
};

export const languageMap = {
  en: '英文',
  zh_CN: '简体中文',
  zh_TW: '繁体中文',
  zh_HK: '繁体中文',
};

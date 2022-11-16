export enum ResultCode {
  /*通用请求成功*/
  REQUEST_SUCCESS = 20000,
  /*通用请求错误*/
  REQUEST_ERROR = 21000,
  /*参数为空*/
  PARAM_IS_NULL = 30000,
  /*程序异常*/
  EXCEPTION = 50000,
  /*未授权*/
  UN_AUTHENTICATED = 41000,
  /*账户未验证*/
  USER_IS_NOT_VERIFY = 42000,
  /*访问受限，授权过期*/
  FORBIDDEN = 43000,
}

/**
 * 客户端类型：1小程序 2web 3H5 4未知
 */
export enum ClientType {
  MINI_APP = 1,
  WEB = 2,
  H5 = 3,
  OTHER = 4,
}

export const ClientTypeMap = {
  [ClientType.MINI_APP]: '小程序',
  [ClientType.WEB]: 'web',
  [ClientType.H5]: 'H5',
  [ClientType.OTHER]: '未知',
};

/**
 * 日志类型：1登录 2登出 3注册
 */
export enum LogType {
  LOGIN = 1,
  LOGOUT = 2,
  REGISTER = 3,
}

export const LogTypeMap = {
  [LogType.LOGIN]: '登录',
  [LogType.LOGOUT]: '登出',
  [LogType.REGISTER]: '注册',
};

/**
 * 通用数据状态：0正常 1已删除
 */
export enum CommonDataStatus {
  /** 正常 */
  Normal = 0,
  /** 已删除 */
  Deleted = 1,
}

export const CommonDataStatusMap = {
  [CommonDataStatus.Normal]: '正常',
  [CommonDataStatus.Deleted]: '已删除',
};

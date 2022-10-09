/**
 * 是否发送成功 1成功 0失败
 */
export enum SmsLogSuccess {
  SUCCESS = 1,
  FAILED = 0,
}

export const SmsLogSuccessMap = {
  [SmsLogSuccess.SUCCESS]: '成功',
  [SmsLogSuccess.FAILED]: '失败',
};

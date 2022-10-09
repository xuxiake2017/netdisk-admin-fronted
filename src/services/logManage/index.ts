import { postJSON } from '@/utils/request';

import type { SysLog, SysLogQueryParams, SmsLogQueryParams, SmsLog } from './typings';

export const getSysLog = (params: SysLogQueryParams) => {
  return postJSON<RequestData<PageInfo<SysLog>>>('/logManage/sysLog', params);
};

export const getSmsLog = (params: SmsLogQueryParams) => {
  return postJSON<RequestData<PageInfo<SmsLog>>>('/logManage/smsLog', params);
};

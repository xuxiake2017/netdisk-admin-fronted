import type { ClientType, LogType } from '@/constant';
import type { SmsLogSuccess } from '../constant';

export interface SysLogQueryParams extends CommonPageParams {
  searchText?: string;
  clientType?: ClientType;
  logType?: LogType;
  startTime?: number;
  endTime?: number;
  dateRange?: string[];
}
export interface SysLog {
  id: number;
  host: string;
  clientIp: string;
  clientType: ClientType;
  optUser: string;
  optNickname: string;
  content: string;
  requestHeader: string;
  result: string;
  logType: LogType;
  createTime: number;
  updateTime: number;
}

export interface SmsLogQueryParams extends CommonPageParams {
  searchText?: string;
  clientType?: ClientType;
  success?: SmsLogSuccess;
  startTime?: number;
  endTime?: number;
  dateRange?: string[];
}
export interface SmsLog {
  id: number;
  clientIp: string;
  clientType: ClientType;
  bizId: string;
  sendTime: number;
  reportTime: number;
  success: SmsLogSuccess;
  errMsg: string;
  errCode: string;
  phoneNumber: string;
  msgContent: string;
  code: string;
  mnsMessageBody: string;
  createTime: number;
  updateTime: number;
}

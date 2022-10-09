import type { ResultCode } from 'src/constant';

declare global {
  declare interface RequestData<T = any> {
    code: ResultCode;
    data: T;
    msg: string;
  }
  declare interface CommonPageParams {
    pageNum?: number;
    pageSize?: number;
  }
  declare interface PageInfo<T = any> {
    pageNum: number;
    pageSize: number;
    total: number;
    list: T[];
  }
}

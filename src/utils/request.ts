import request from 'umi-request';
import { message } from 'antd';

import { ResultCode } from '@/constant';
import { INTERFACE_FREFIX, TOKEN_NAME } from '@/config';

import type { RequestOptionsInit } from 'umi-request';

const customRequest = async <T extends RequestData = RequestData>(
  url: string,
  method: 'post' | 'get',
  params: Record<string, any>,
  showErrorMessage: boolean = true,
  options: RequestOptionsInit = {},
): Promise<T> => {
  let options_: RequestOptionsInit = {
    ...options,
    method,
    headers: {
      [TOKEN_NAME]: localStorage.getItem(TOKEN_NAME) || '',
      ...options.headers,
    },
  };
  if (method === 'get') {
    options_ = {
      ...options_,
      params,
    };
  } else {
    options_ = {
      ...options_,
      data: {
        ...params,
      },
    };
  }
  try {
    const res = await request<T>(`${INTERFACE_FREFIX}${url}`, options_);
    if (res.code === ResultCode.REQUEST_SUCCESS) {
      return Promise.resolve(res);
    } else {
      if (showErrorMessage && res.msg) {
        message.error(res.msg);
      }
      return Promise.reject(new Error(res.msg));
    }
  } catch (error) {
    if (error instanceof Error && showErrorMessage && error.message) {
      message.error(error.message);
    }
    return Promise.reject(error);
  }
};

export const post = async <T extends RequestData>(
  url: string,
  params: Record<string, any> = {},
  showErrorMessage: boolean = true,
): Promise<T> => {
  return customRequest<T>(url, 'post', params, showErrorMessage, {
    requestType: 'form',
  });
};

export const postJSON = async <T extends RequestData>(
  url: string,
  params: Record<string, any> = {},
  showErrorMessage: boolean = true,
): Promise<T> => {
  return customRequest<T>(url, 'post', params, showErrorMessage);
};

export const get = async <T extends RequestData>(
  url: string,
  params: Record<string, any> = {},
  showErrorMessage: boolean = true,
): Promise<T> => {
  return customRequest<T>(url, 'get', params, showErrorMessage);
};

export default customRequest;

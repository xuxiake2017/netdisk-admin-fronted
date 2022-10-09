import { Input } from 'antd';
import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

import { ClientTypeMap } from '@/constant';
import { SmsLogSuccessMap } from '@/services/logManage/constant';
import { getSmsLog } from '@/services/logManage';

import type { SmsLog, SmsLogQueryParams } from '@/services/logManage/typings';
import type { RequestData } from '@ant-design/pro-table/lib/typing';

const getTableData = async (
  params: {
    pageSize?: number;
    current?: number;
    keyword?: string;
  } & SmsLogQueryParams,
): Promise<Partial<RequestData<SmsLog>>> => {
  const { dateRange, current, ...rest } = params;
  const params_: SmsLogQueryParams = {
    ...rest,
    pageNum: current,
    startTime: dateRange && new Date(dateRange[0]).getTime(),
    endTime: dateRange && new Date(dateRange[1]).getTime(),
  };
  return getSmsLog(params_).then((res) => {
    return {
      data: res.data.list,
      total: res.data.total,
    };
  });
};

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<SmsLog>[] = [
    {
      title: '搜索关键词',
      dataIndex: 'searchText',
      hideInTable: true,
      renderFormItem: (item, { defaultRender, ...rest }) => {
        return <Input {...rest} placeholder="客户端IP/电话号码" />;
      },
    },
    {
      title: '客户端IP',
      dataIndex: 'clientIp',
      hideInSearch: true,
    },
    {
      title: '客户端类型',
      dataIndex: 'clientType',
      valueEnum: ClientTypeMap,
    },
    {
      title: 'bizId',
      dataIndex: 'bizId',
      hideInSearch: true,
    },
    {
      title: '发送时间',
      dataIndex: 'sendTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '接收时间',
      dataIndex: 'reportTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '是否发送成功',
      dataIndex: 'success',
      valueEnum: SmsLogSuccessMap,
    },
    {
      title: '错误消息',
      dataIndex: 'errMsg',
      hideInSearch: true,
    },
    {
      title: '错误代码',
      dataIndex: 'errCode',
      hideInSearch: true,
    },
    {
      title: '电话号码',
      dataIndex: 'phoneNumber',
      hideInSearch: true,
    },
    {
      title: '短信内容',
      dataIndex: 'msgContent',
      hideInSearch: true,
      width: 200,
      ellipsis: true,
    },
    {
      title: '验证码',
      dataIndex: 'code',
      hideInSearch: true,
    },
    {
      title: 'mns消息体',
      dataIndex: 'mnsMessageBody',
      hideInSearch: true,
      width: 200,
      ellipsis: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'dateRange',
      hideInTable: true,
      valueType: 'dateTimeRange',
    },
  ];

  return (
    <PageContainer>
      <ProTable<SmsLog, SmsLogQueryParams>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        request={getTableData}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;

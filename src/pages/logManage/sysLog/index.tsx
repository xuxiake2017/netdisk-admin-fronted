import { Input } from 'antd';
import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

import { ClientTypeMap, LogTypeMap } from '@/constant';
import { getSysLog } from '@/services/logManage';

import type { SysLog, SysLogQueryParams } from '@/services/logManage/typings';
import type { RequestData } from '@ant-design/pro-table/lib/typing';

const getTableData = async (
  params: {
    pageSize?: number;
    current?: number;
    keyword?: string;
  } & SysLogQueryParams,
): Promise<Partial<RequestData<SysLog>>> => {
  const { dateRange, current, ...rest } = params;
  const params_: SysLogQueryParams = {
    ...rest,
    pageNum: current,
    startTime: dateRange && new Date(dateRange[0]).getTime(),
    endTime: dateRange && new Date(dateRange[1]).getTime(),
  };
  return getSysLog(params_).then((res) => {
    return {
      data: res.data.list,
      total: res.data.total,
    };
  });
};

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<SysLog>[] = [
    {
      title: '搜索关键词',
      dataIndex: 'searchText',
      hideInTable: true,
      renderFormItem: (item, { defaultRender, ...rest }) => {
        return <Input {...rest} placeholder="客户端IP/操作用户/操作用户昵称" />;
      },
    },
    {
      title: '访问主机',
      dataIndex: 'host',
      hideInSearch: true,
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
      title: '日志类型',
      dataIndex: 'logType',
      valueEnum: LogTypeMap,
    },
    {
      title: '操作用户',
      dataIndex: 'optUser',
      hideInSearch: true,
    },
    {
      title: '操作用户昵称',
      dataIndex: 'optNickname',
      hideInSearch: true,
    },
    {
      title: '内容',
      dataIndex: 'content',
      width: 200,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '请求头',
      dataIndex: 'requestHeader',
      width: 200,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '结果',
      dataIndex: 'result',
      width: 200,
      ellipsis: true,
      hideInSearch: true,
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
      <ProTable<SysLog, SysLogQueryParams>
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

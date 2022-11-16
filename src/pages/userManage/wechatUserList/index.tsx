import { Input } from 'antd';
import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { ProColumns, ActionType, TableDropdown } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

import { SexMap, languageMap } from '@/services/userManage/constant';
import { CommonDataStatusMap } from '@/constant';
import { getWeChatUserList } from '@/services/userManage';

import type { WeChatUser, WeChatUserListQueryParams } from '@/services/userManage/typings';
import type { RequestData } from '@ant-design/pro-table/lib/typing';

const getTableData = async (
  params: {
    pageSize?: number;
    current?: number;
    keyword?: string;
  } & WeChatUserListQueryParams,
): Promise<Partial<RequestData<WeChatUser>>> => {
  const { dateRange, current, ...rest } = params;
  const params_: WeChatUserListQueryParams = {
    ...rest,
    pageNum: current,
    startTime: dateRange && new Date(dateRange[0]).getTime(),
    endTime: dateRange && new Date(dateRange[1]).getTime(),
  };
  return getWeChatUserList(params_).then((res) => {
    return {
      data: res.data.list,
      total: res.data.total,
    };
  });
};

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<WeChatUser>[] = [
    {
      title: '搜索关键词',
      dataIndex: 'searchText',
      hideInTable: true,
      renderFormItem: (item, { defaultRender, ...rest }) => {
        return <Input {...rest} placeholder="地区/昵称" />;
      },
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
      hideInSearch: true,
      width: 200,
      ellipsis: true,
    },
    {
      title: '头像',
      dataIndex: 'avatarUrl',
      hideInSearch: true,
      valueType: 'avatar',
    },
    {
      title: '地区',
      dataIndex: 'city',
      hideInSearch: true,
      render(dom, entity, index, action, schema) {
        return `${entity.country || '-'}/${entity.province || '-'}/${entity.city || '-'}`;
      },
    },
    {
      title: '性别',
      dataIndex: 'gender',
      valueEnum: SexMap,
    },
    {
      title: '语言',
      dataIndex: 'language',
      hideInSearch: true,
      valueEnum: languageMap,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: CommonDataStatusMap,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true,
      valueType: 'dateTime',
    },
    {
      title: '创建时间',
      dataIndex: 'dateRange',
      hideInTable: true,
      valueType: 'dateTimeRange',
    },
    {
      title: '关联用户',
      dataIndex: 'userId',
      hideInSearch: true,
      render(dom, entity, index, action, schema) {
        return (
          <TableDropdown
            onSelect={() => action?.reload()}
            menus={[{ key: 'unbind', name: '解绑' }]}
          >
            <a>{entity.user?.username}</a>
          </TableDropdown>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<WeChatUser, WeChatUserListQueryParams>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
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

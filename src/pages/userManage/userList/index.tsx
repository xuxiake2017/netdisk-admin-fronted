import { Input, Space } from 'antd';
import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Progress } from '@ant-design/charts';

import { UserStatus, UserStatusMap, SexMap } from '@/services/userManage/constant';
import { getUserList } from '@/services/userManage';
import { formatByte } from '@/utils';

import type { UserListItem, UserListQueryParams } from '@/services/userManage/typings';
import type { RequestData } from '@ant-design/pro-table/lib/typing';

const getTableData = async (
  params: {
    pageSize?: number;
    current?: number;
    keyword?: string;
  } & UserListQueryParams,
): Promise<Partial<RequestData<UserListItem>>> => {
  const { dateRange, current, ...rest } = params;
  const params_: UserListQueryParams = {
    ...rest,
    pageNum: current,
    startTime: dateRange && new Date(dateRange[0]).getTime(),
    endTime: dateRange && new Date(dateRange[1]).getTime(),
  };
  return getUserList(params_).then((res) => {
    return {
      data: res.data.list,
      total: res.data.total,
    };
  });
};

const UserStatusTagMap = {
  [UserStatus.USER_STATUS_NORMAL]: {
    text: UserStatusMap[UserStatus.USER_STATUS_NORMAL],
    color: '#52C41A',
  },
  [UserStatus.USER_STATUS_NOT_EXIST]: {
    text: UserStatusMap[UserStatus.USER_STATUS_NOT_EXIST],
    color: '#FF4D4F',
  },
  [UserStatus.USER_STATUS_VIP]: {
    text: UserStatusMap[UserStatus.USER_STATUS_VIP],
    color: '#177DDC',
  },
  [UserStatus.USER_STATUS_DEL_BY_ADMIN]: {
    text: UserStatusMap[UserStatus.USER_STATUS_DEL_BY_ADMIN],
    color: '#FF4D4F',
  },
  [UserStatus.USER_STATUS_NOT_VERIFY]: {
    text: UserStatusMap[UserStatus.USER_STATUS_NOT_VERIFY],
    color: '#FF4D4F',
  },
};

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<UserListItem>[] = [
    {
      title: '搜索关键词',
      dataIndex: 'searchText',
      hideInTable: true,
      renderFormItem: (item, { defaultRender, ...rest }) => {
        return <Input {...rest} placeholder="用户名/真实姓名/手机/邮箱/昵称" />;
      },
    },
    {
      title: '用户名',
      dataIndex: 'username',
      hideInSearch: true,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      valueEnum: SexMap,
    },
    {
      title: '真实姓名',
      dataIndex: 'realName',
      hideInSearch: true,
    },
    {
      title: '注册时间',
      dataIndex: 'regTime',
      hideInSearch: true,
      valueType: 'dateTime',
    },
    {
      title: '容量使用情况',
      dataIndex: 'totalMemory',
      hideInSearch: true,
      render(dom, entity, index, action, schema) {
        return (
          <Space>
            <Progress
              height={46}
              width={120}
              percent={entity.usedMemory / entity.totalMemory}
              color="#FF9743"
              forceFit
              size={8}
              marker={[
                {
                  value: entity.usedMemory / entity.totalMemory,
                  style: {
                    stroke: '#FF9743',
                  },
                },
              ]}
            />
            <span>
              {formatByte(entity.usedMemory)}/{formatByte(entity.totalMemory)}
            </span>
          </Space>
        );
      },
      width: 300,
    },
    // {
    //   title: '总容量',
    //   dataIndex: 'totalMemory',
    //   hideInSearch: true,
    //   render (dom, entity, index, action, schema) {
    //     return formatByte(entity.totalMemory);
    //   },
    // },
    {
      title: '电话',
      dataIndex: 'phone',
      hideInSearch: true,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'userStatus',
      valueEnum: UserStatusTagMap,
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      hideInSearch: true,
      valueType: 'avatar',
    },
    // {
    //   title: '签名',
    //   dataIndex: 'signature',
    //   hideInSearch: true,
    //   width: 200,
    //   ellipsis: true,
    // },
    {
      title: '昵称',
      dataIndex: 'nickName',
      hideInSearch: true,
      width: 200,
      ellipsis: true,
    },
    {
      title: '注册时间',
      dataIndex: 'dateRange',
      hideInTable: true,
      valueType: 'dateTimeRange',
    },
  ];

  return (
    <PageContainer>
      <ProTable<UserListItem, UserListQueryParams>
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

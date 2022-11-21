import { LockOutlined, UserOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { Alert, message } from 'antd';
import React, { useState } from 'react';
import { ProFormText, LoginForm } from '@ant-design/pro-form';
import { history, FormattedMessage, SelectLang, useModel } from 'umi';
import { useRequest } from 'ahooks';

import Footer from '@/components/Footer';
import { getCaptcha, login } from '@/services/user';
import { TOKEN_NAME } from '@/config';

import type { LoginParams } from '@/services/user/typings';

import styles from './index.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC = () => {
  const [errMessage, setErrMessage] = useState<string>('');
  const { initialState, setInitialState } = useModel('@@initialState');

  const { data, run } = useRequest(getCaptcha);

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  const handleSubmit = async (values: LoginParams) => {
    try {
      // 登录
      const res = await login({ ...values, uuid: data?.data.uuid as string });
      localStorage.setItem(TOKEN_NAME, res.data.token);
      message.success('登录成功！');
      await fetchUserInfo();
      /** 此方法会跳转到 redirect 参数所在的位置 */
      if (!history) return;
      const { query } = history.location;
      const { redirect } = query as { redirect: string };
      history.push(redirect || '/');
    } catch (error) {
      console.log(error);
      if (error instanceof Error) setErrMessage(error.message);
      run();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <LoginForm<LoginParams>
          logo={<img alt="logo" src={`${publicPath}/logo.svg`} />}
          title="Netdisk Admin"
          subTitle="Netdisk Admin后台管理系统"
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values);
          }}
        >
          {errMessage && <LoginMessage content={errMessage} />}
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder="请输入用户名"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="请输入用户名!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder="请输入密码"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="请输入密码！"
                    />
                  ),
                },
              ]}
            />
            <ProFormText
              name="captcha"
              fieldProps={{
                size: 'large',
                prefix: <SafetyCertificateOutlined />,
                suffix: (
                  <img
                    src={data?.data.captchaBASE64}
                    style={{
                      cursor: 'pointer',
                    }}
                    onClick={run}
                    title="更换验证码"
                  />
                ),
              }}
              placeholder="请输入验证码"
              rules={[
                {
                  required: true,
                  message: '请输入验证码!',
                },
              ]}
            />
          </>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

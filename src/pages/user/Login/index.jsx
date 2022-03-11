import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { message, Button } from "antd";
import React, { useState } from "react";
import { ProFormRadio, ProFormText, LoginForm } from "@ant-design/pro-form";
import { history, useModel } from "umi";
import { login } from "@/services/user";
import styles from "./index.less";
import store from "store";

const Login = () => {
  const { initialState, setInitialState } = useModel("@@initialState");

  const fetchUserInfo = async (user, token) => {
    const userInfo = user;
    store.set("user", user);
    store.set("token", token);
    if (userInfo) {
      await setInitialState((s) => ({ ...s, currentUser: userInfo }));
    }
  };

  const handleSubmit = async (values) => {
    try {
      const res = await login(values);

      if (res.success) {
        message.success("Welcome : D");
        await fetchUserInfo(res.user, res.token);

        if (!history) return;
        const { query } = history.location;
        const { redirect } = query;
        history.push("/admin/dashboard");
        return;
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error("Log in failed.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="/logo.svg" />}
          title="Feedback System"
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            history.push("/admin/dashboard");

            // await handleSubmit(values);
          }}
        >
          <div style={{ marginTop: 30 }} />
          <ProFormRadio.Group
            name="isAdmin"
            radioType="button"
            initialValue={true}
            options={[
              {
                label: "Administrator",
                value: "admin",
              },
              {
                label: "Assigned Officer",
                value: "assigned-officer",
              },
            ]}
          />
          <ProFormText
            name="email"
            fieldProps={{
              size: "large",
              prefix: <UserOutlined className={styles.prefixIcon} />,
            }}
            placeholder={"Email"}
            rules={[
              {
                // required: true,
                message: "Email required",
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined className={styles.prefixIcon} />,
            }}
            placeholder={"Password"}
            rules={[
              {
                // required: true,
                message: "Password required",
              },
            ]}
          />

          <a href="/rating-page">
            <Button type="primary" size={"large"}>
              Rating Page
            </Button>
          </a>
          <a href="/admin/dashboard">
            <Button type="primary" size={"large"}>
              Dashboard
            </Button>
          </a>
          <div style={{ marginBottom: 30 }} />
        </LoginForm>
      </div>
    </div>
  );
};

export default Login;

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { message, Button, Tabs, Row, Col } from "antd";
import React, { useState, useRef } from "react";
import { history, useModel } from "umi";
import { login, signup } from "@/services/user";
import styles from "./index.less";
import store from "store";

import ProForm, { ProFormText, ProFormRadio } from "@ant-design/pro-form";

const { TabPane } = Tabs;

const Login = () => {
  const { initialState, setInitialState } = useModel("@@initialState");
  let tabRef = useRef();

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

  const LoginForm = () => {
    return (
      <ProForm
        initialValues={{
          autoLogin: true,
        }}
        onFinish={async (values) => {
          await handleSubmit(values);
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
              required: true,
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
              required: true,
              message: "Password required",
            },
          ]}
        />
      </ProForm>
    );
  };

  const SignUpForm = () => {
    return (
      <ProForm
        onFinish={async (values) => {
          try {
            const res = await signup(values);

            if (res.success) {
              message.success(res.message);
              history.push("/user/login");
              return;
            } else {
              message.error(res.message);
            }
          } catch (error) {
            message.error("Sign up failed.");
          }
        }}
      >
        <ProFormText
          name="firstname"
          label="Last Name"
          placeholder=""
          rules={[
            {
              required: true,
            },
          ]}
        />
        <ProFormText
          name="lastname"
          label="First Name"
          placeholder=""
          rules={[
            {
              required: true,
            },
          ]}
        />
        <ProFormText
          name="middlename"
          label="Middle Name"
          placeholder=""
          rules={[
            {
              required: true,
            },
          ]}
        />
        <ProFormText
          name="email"
          label="Email"
          placeholder=""
          rules={[
            {
              required: true,
              message: "Field required",
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          label="Password"
          placeholder=""
          rules={[
            {
              required: true,
              message: "Field required",
            },
          ]}
        />
      </ProForm>
    );
  };

  return (
    <div style={{  marginLeft: '10vw', marginRight: '10vw' }}>
      <Row align="middle">
        <Col>
          <img
            src={"../assets/images/icons.png"}
            style={{
              height: 50,
              width: 50,
              marginRight: 20
            }}
          />
        </Col>
        <Col>
          <h3> TSC Breeder farm. External farm of San Miguel foods INC</h3>
        </Col>
      </Row>
      <Row style={{ marginTop: 50 }}>
        <Col span={12} align="middle">
          <img
            src={"../assets/images/login_image.png"}
            style={{
              width: "50%",
              objectFit: "contain",
            }}
          />
        </Col>
        <Col span={12}>
          <Tabs defaultActiveKey="1" tabRef={tabRef}>
            <TabPane tab="Log In" key="1">
              <LoginForm />
            </TabPane>
            <TabPane tab="Sign Up" key="2">
              <SignUpForm />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
};

export default Login;

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { message, Button, Tabs, Row, Col } from "antd";
import React, { useState, useRef } from "react";
import { history, useModel } from "umi";
import { login, signup } from "@/services/user";
import styles from "./index.less";
import store from "store";
import { Typography } from "antd";

const { Title } = Typography;

import ProForm, { ProFormText, ProFormRadio } from "@ant-design/pro-form";

const { TabPane } = Tabs;

const Login = () => {
  const { initialState, setInitialState } = useModel("@@initialState");
  let tabRef = useRef();

  const fetchUserInfo = async (user, token, mode) => {
    const userInfo = user;
    store.set("user", { ...user, mode });
    store.set("token", token);
    if (userInfo) {
      await setInitialState((s) => ({ ...s, currentUser: userInfo }));
    }
  };

  const handleSubmit = async (values) => {
    try {
      const res = await login(values);

      if (res.success) {
        message.success("Welcome");
        await fetchUserInfo(res.user, res.token, values.mode);

        if (!history) return;
        const { query } = history.location;
        const { redirect } = query;
        history.push(
          values.mode === "admin"
            ? "/admin/dashboard"
            : "/assignedOffer/dashboard"
        );
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
        submitter={{
          render: (props, doms) => {
            return [
              <Button
                size="large"
                loading={props?.submitButtonProps?.loading}
                type="primary"
                key="submit"
                onClick={() => props.form?.submit?.()}
              >
                Login
              </Button>,
              <Button
                size="large"
                loading={props?.submitButtonProps?.loading}
                onClick={() => props.form?.resetFields?.()}
              >
                Reset
              </Button>,
            ];
          },
        }}
      >
        <div style={{ marginTop: 10 }} />
        <ProFormRadio.Group
          name="mode"
          radioType="button"
          buttonStyle="solid"
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
          rules={[
            {
              required: true,
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
        submitter={{
          render: (props, doms) => {
            return [
              <Button
                loading={props?.submitButtonProps?.loading}
                type="primary"
                key="submit"
                onClick={() => props.form?.submit?.()}
              >
                Sign Up
              </Button>,
              <Button
                loading={props?.submitButtonProps?.loading}
                onClick={() => props.form?.resetFields?.()}
              >
                Reset
              </Button>,
            ];
          },
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
    <div style={{ marginLeft: "10vw", marginRight: "10vw" }}>
      <Row align="middle" style={{ marginTop: 20 }}>
        <Col>
          <img
            src={"../assets/images/icons.png"}
            style={{
              height: 50,
              width: 50,
              marginRight: 20,
            }}
          />
        </Col>
        <Col>
          <h3> TSC Breeder farm. External farm of San Miguel foods INC</h3>
        </Col>
      </Row>
      <Row gutter={200}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <img
            src={"../assets/images/rate.svg"}
            style={{
              height: 200,
              marginBottom: 50,
              marginTop: 50,
            }}
          />
          <ProForm
            style={{}}
            onFinish={(values) => {
              history.push("/rating-page", values);
            }}
            submitter={{
              render: (props, doms) => {
                return [
                  <Button
                    loading={props?.submitButtonProps?.loading}
                    type="primary"
                    key="submit"
                    size="large"
                    onClick={() => props.form?.submit?.()}
                  >
                    Rate Now!
                  </Button>,
                ];
              },
            }}
          >
            <Title level={3}>Rate</Title>
            <ProFormText
              name="fullname"
              placeholder="Full Name"
              rules={[
                {
                  required: true,
                },
              ]}
              label={"Your name"}
            />
            <ProFormRadio.Group
              name={"raterType"}
              style={{
                margin: 16,
              }}
              label={"I am a"}
              radioType="button"
              size="large"
              options={["Doctor", "Client", "Company Employee", "Visitor"]}
              rules={[
                {
                  required: true,
                },
              ]}
            />
          </ProForm>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <img
            src={"../assets/images/admin.svg"}
            style={{
              height: 200,
              marginBottom: 50,
              marginTop: 50,
            }}
          />
          <Title level={3}>Administrator</Title>
          <Tabs
            defaultActiveKey="1"
            tabRef={tabRef}
            style={{ marginBottom: 20 }}
          >
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

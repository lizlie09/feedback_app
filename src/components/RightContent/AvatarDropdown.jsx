import React, { useCallback, useState } from "react";
import { LogoutOutlined, KeyOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Menu, Spin, message } from "antd";
import { history, useModel } from "umi";
import { stringify } from "querystring";
import HeaderDropdown from "../HeaderDropdown";
import styles from "./index.less";
import { changePassword } from "@/services/user";
import ProForm, { ProFormText, ModalForm } from "@ant-design/pro-form";
import store from "store";
const loginOut = async () => {
  // await outLogin();
  const { query = {}, search, pathname } = history.location;
  const { redirect } = query; // Note: There may be security issues, please note

  if (window.location.pathname !== "/user/login" && !redirect) {
    store.remove("user");
    store.remove("token");
    history.replace({
      pathname: "/user/login",
      // search: stringify({
      //   redirect: pathname + search,
      // }),
    });
  }
};

const AvatarDropdown = ({ menu }) => {
  let [passwordModal, setPasswordModal] = useState(false);
  const { initialState, setInitialState } = useModel("@@initialState");
  const onMenuClick = useCallback(
    (event) => {
      const { key } = event;

      if (key === "change-password") {
        setPasswordModal(true);
        return;
      }

      if (key === "logout") {
        setInitialState((s) => ({ ...s, currentUser: undefined }));
        loginOut();
        return;
      }

      history.push(`/account/${key}`);
    },
    [setInitialState]
  );
  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.firstname) {
    return loading;
  }

  const ChangePassword = () => {
    return (
      <ModalForm
        title="Change Password"
        width={300}
        visible={passwordModal}
        modalProps={{
          onCancel: () => {
            setPasswordModal(false);
          },
        }}
        onFinish={async (values) => {
          if (values?.newPassword !== values?.confirmPassword) {
            message.error("New and confirm password don't match.");
            return;
          }

          let res = await changePassword({
            newPassword: values?.newPassword,
            oldPassword: values?.oldPassword,
          });
          if (res.success) {
            message.success(res.message);
            setPasswordModal(false);
          } else {
            message.error(res.message);
          }
        }}
      >
        <ProFormText.Password
          width="md"
          name="oldPassword"
          label="Old Password"
        />
        <ProFormText.Password
          width="md"
          name="newPassword"
          label="New Password"
        />
        <ProFormText.Password
          width="md"
          name="confirmPassword"
          label="Confirm New Password"
        />
      </ModalForm>
    );
  };

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="change-password">
        <ChangePassword />
        <KeyOutlined />
        Change Password
      </Menu.Item>
      <Menu.Item key="logout">
        <LogoutOutlined />
        Log out
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <UserOutlined style={{ marginRight: 10 }} />
        <span className={`${styles.name} anticon`}>
          {currentUser.firstname} {currentUser.lastname}
        </span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;

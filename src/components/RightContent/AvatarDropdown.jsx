import React, { useCallback } from "react";
import { LogoutOutlined, KeyOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Menu, Spin } from "antd";
import { history, useModel } from "umi";
import { stringify } from "querystring";
import HeaderDropdown from "../HeaderDropdown";
import styles from "./index.less";

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  // await outLogin();
  const { query = {}, search, pathname } = history.location;
  const { redirect } = query; // Note: There may be security issues, please note

  if (window.location.pathname !== "/user/login" && !redirect) {
    history.replace({
      pathname: "/user/login",
      // search: stringify({
      //   redirect: pathname + search,
      // }),
    });
  }
};

const AvatarDropdown = ({ menu }) => {
  const { initialState, setInitialState } = useModel("@@initialState");
  const onMenuClick = useCallback(
    (event) => {
      const { key } = event;

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

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="logout">
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

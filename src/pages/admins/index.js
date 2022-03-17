import React, { useEffect, useState, useRef } from "react";
import { Pie } from "@ant-design/plots";
import { Col, Row, Card, Button, message } from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { DatePicker, Space } from "antd";
import ProTable, { TableDropdown } from "@ant-design/pro-table";
import { getAdmins } from "../../services/user";

export default () => {
  const actionRef = useRef();
  return (
    <div>
      <ProTable
        actionRef={actionRef}
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary">
            Add Admin
          </Button>,
        ]}
        request={async () => {
          try {
            let res = await getAdmins();
            return {
              data: res.admins,
            };
          } catch (err) {
            console.log(err);
            message.error("An error occurred");
          }
        }}
        columns={[
          {
            title: "Email",
            dataIndex: "email",
          },
          {
            title: "Name",
            render: (dom, entity) =>
              `${entity?.lastname}, ${entity?.firstname} ${entity?.middlename}`,
          },
          
        ]}
        rowKey="key"
        pagination={{
          showQuickJumper: true,
        }}
        search={false}
        dateFormatter="string"
        headerTitle="Offices"
      />
    </div>
  );
};

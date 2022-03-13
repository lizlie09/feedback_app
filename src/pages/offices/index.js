import React, { useEffect, useState } from "react";
import { Pie } from "@ant-design/plots";
import { Col, Row, Card, Button } from "antd";
import { PlusOutlined, EllipsisOutlined } from "@ant-design/icons";
import { DatePicker, Space } from "antd";
import ProTable, { TableDropdown } from "@ant-design/pro-table";
import { getOffices } from "../../services/office";
import moment from "moment";
const { RangePicker } = DatePicker;

export default () => {
  return (
    <div>
      <ProTable
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary">
            Add Office
          </Button>,
        ]}
        request={async () => {
          try {
            let res = await getOffices();
            return {
              data: res.offices,
            };
          } catch (err) {
            console.log(err);
          }
        }}
        columns={[
          {
            title: "Name of Office",
            width: 80,
            dataIndex: "name",
          },
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

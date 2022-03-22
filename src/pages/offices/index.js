import React, { useEffect, useState, useRef } from "react";
import { Pie } from "@ant-design/plots";
import { Col, Row, Card, Button } from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { DatePicker, Space } from "antd";
import ProTable, { TableDropdown } from "@ant-design/pro-table";
import { getOffices } from "../../services/office";
import AddOffice from "./components/AddOffice";
import EditOffice from "./components/EditOffice";
import moment from "moment";
const { RangePicker } = DatePicker;

export default () => {
  let [addOfficeModal, setAddOfficeModal] = useState(false);
  let [editOfficeModal, setEditOfficeModal] = useState(false);
  let [selectedEntry, setSelectedEntry] = useState({});
  const actionRef = useRef();
  return (
    <div>
      <AddOffice
        state={addOfficeModal}
        setState={setAddOfficeModal}
        actionRef={actionRef}
      />
      {editOfficeModal && (
        <EditOffice
          state={editOfficeModal}
          setState={setEditOfficeModal}
          actionRef={actionRef}
          defaultValue={selectedEntry}
        />
      )}
      <ProTable
        actionRef={actionRef}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setAddOfficeModal(true)}
          >
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
          {
            title: "Actions",
            render: (dom, entity) => {
              return (
                <Button
                  key="button"
                  icon={<EditOutlined />}
                  type="primary"
                  onClick={() => {
                    setSelectedEntry(entity);
                    setEditOfficeModal(true);
                  }}
                >
                  Edit
                </Button>
              );
            },
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

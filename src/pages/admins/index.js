import React, { useEffect, useState, useRef } from "react";
import { Pie } from "@ant-design/plots";
import { Col, Row, Card, Button, message, Popconfirm } from "antd";
import { PlusOutlined, UserDeleteOutlined } from "@ant-design/icons";
import { DatePicker, Space } from "antd";
import ProTable, { TableDropdown } from "@ant-design/pro-table";
import { addAdmin, getAdmins, removeScope } from "../../services/user";
import ProForm, { ProFormText, ModalForm } from "@ant-design/pro-form";

export default () => {
  const actionRef = useRef();
  let [addAdminModal, setAddAdminModal] = useState(false);

  const AddAdmin = () => {
    return (
      <ModalForm
        title="Add Admin"
        visible={addAdminModal}
        width={300}
        modalProps={{
          onCancel: () => setAddAdminModal(false),
        }}
        onFinish={async (values) => {
          let res = await addAdmin({
            ...values,
            role: "admin",
          });
          if (res.success) {
            message.success(res.message);
            setAddAdminModal(false);
            actionRef?.current?.reload();
          } else {
            message.error(res.message);
          }
        }}
      >
        <ProFormText
          width="md"
          name="email"
          label="Email"
          placeholder="Enter email"
        />
      </ModalForm>
    );
  };

  const fetchRemoveAdmin = async (email) => {
    let res = await removeScope({ email, role: "admin" });
    if (res.success) {
      message.success(res.message);
      actionRef?.current?.reload();
    } else {
      message.error(res.message);
    }
  };

  return (
    <div>
      <AddAdmin />
      <ProTable
        actionRef={actionRef}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => setAddAdminModal(true)}
            type="primary"
          >
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
          {
            title: "Actions",
            render: (dom, entity) => {
              return (
                <Popconfirm
                  placement="leftTop"
                  title={"Remove admin?"}
                  onConfirm={() => fetchRemoveAdmin(entity.email)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    key="button"
                    icon={<UserDeleteOutlined />}
                    type="primary"
                    danger
                  >
                    Remove
                  </Button>
                </Popconfirm>
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

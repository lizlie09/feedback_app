import React, { useState } from "react";
import { Modal, Button, message } from "antd";
import ProForm, { ProFormText, ProFormRadio } from "@ant-design/pro-form";
import { editOffice } from "../../../services/office";

export default ({ state, setState, actionRef, defaultValue }) => {
  return (
    <>
      <Modal
        title="Add Office"
        centered
        visible={state}
        onCancel={() => setState(false)}
        footer={false}
      >
        <ProForm
          onFinish={async (values) => {
            try {
              const res = await editOffice({ _id: defaultValue._id, ...values });

              if (res.success) {
                setState(false);
                message.success(res.message);
                actionRef?.current?.reload();
              } else {
                message.error(res.message);
              }
            } catch (error) {
              message.error("Failed");
            }
          }}
        >
          <ProFormText
            name="name"
            label="Name of Office"
            placeholder=""
            initialValue={defaultValue.name}
            extra={"Clear the name of department to delete"}
          />
          <ProFormText
            name="firstname"
            label="First Name"
            placeholder=""
            rules={[
              {
                required: true,
              },
            ]}
            initialValue={defaultValue.firstname}
          />
          <ProFormText
            name="lastname"
            label="Last Name"
            placeholder=""
            rules={[
              {
                required: true,
              },
            ]}
            initialValue={defaultValue.lastname}
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
            initialValue={defaultValue.middlename}
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
            initialValue={defaultValue.email}
          />
        </ProForm>
      </Modal>
    </>
  );
};

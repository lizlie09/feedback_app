import React, { useState } from "react";
import { Modal, Button, message } from "antd";
import ProForm, { ProFormText, ProFormRadio } from "@ant-design/pro-form";
import { addOffice } from "../../../services/office";

export default ({ state, setState, actionRef }) => {
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
              const res = await addOffice(values);

              if (res.success) {
                setState(false);
                message.success("Successfully added");
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
            rules={[
              {
                required: true,
              },
            ]}
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
      </Modal>
    </>
  );
};

import React, { useState } from "react";
import { Modal, Button, message } from "antd";
import ProForm, {
  ProFormText,
  ModalForm,
  ProFormSelect,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { updateReport } from "../../../services/dashboard";

export default ({ state, setState, actionRef, selectedReport }) => {
  return (
    <>
      <ModalForm
        title="Reported Department"
        centered
        visible={state}
        width={400}
        onCancel={() => setState(false)}
        onFinish={async (values) => {
          try {
            const res = await updateReport({
              _id: selectedReport._id,
              remarks: values.remarks,
            });

            if (res.success) {
              setState(false);
              message.success(res.message);
              actionRef?.current?.reload();
            } else {
              message.error(res?.message);
            }
          } catch (error) {
            message.error("Failed");
          }
        }}
      >
        <ProFormText
          name="establishment"
          label="Name of Office"
          placeholder=""
          rules={[
            {
              required: true,
            },
          ]}
          disabled
          initialValue={selectedReport.establishment}
        />
        <ProFormText
          name="name"
          label="Name of Visitor"
          placeholder=""
          rules={[
            {
              required: true,
            },
          ]}
          disabled
          initialValue={selectedReport.fullname}
        />
        <ProFormTextArea
          name="reports"
          label="Reports"
          placeholder=""
          rules={[
            {
              required: true,
            },
          ]}
          disabled
          initialValue={selectedReport?.reports?.join(". ")}
        />
        <ProFormText
          name="reply"
          label="Response"
          placeholder=""
          rules={[
            {
              required: true,
            },
          ]}
          disabled
          initialValue={selectedReport.reply}
        />
        <ProFormSelect
          request={async () => [
            { label: "Done", value: true },
            { label: "Pending", value: false },
          ]}
          initialValue={selectedReport.remarks}
          name="remarks"
          label="Remarks"
        />
      </ModalForm>
    </>
  );
};

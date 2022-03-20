import React, { useState } from "react";
import { Modal, Button, message } from "antd";
import ProForm, {
  ProFormText,
  ModalForm,
  ProFormSelect,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { updateReport } from "../../../services/dashboard";
import store from "store";

export default ({ state, setState, actionRef, selectedReport }) => {
  let user = store.get("user");
  let { mode, data } = selectedReport;

  return (
    <>
      <ModalForm
        title="Reported Department"
        centered
        visible={state}
        width={400}
        modalProps={{
          onCancel: () => setState(false),
        }}
        onFinish={async (values) => {
          try {
            const res = await updateReport({
              _id: data._id,
              ...values,
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
          initialValue={data?.establishment}
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
          initialValue={data?.fullname}
        />
        {mode === "reports" && (
          <ProFormTextArea
            name="reports"
            label="Reports"
            placeholder=""
            disabled
            initialValue={data?.reports?.join(". ")}
          />
        )}
        {mode === "comments" && (
          <ProFormTextArea
            name="rateComment"
            label="Customer Concern"
            placeholder=""
            disabled
            initialValue={data?.rateComment}
          />
        )}
        <ProFormTextArea
          name="reply"
          label="Response"
          placeholder=""
          disabled={user?.mode === "admin" ? true : false}
          initialValue={data?.reply}
        />
        {user.mode === "admin" && (
          <ProFormSelect
            request={async () => [
              { label: "Done", value: true },
              { label: "Pending", value: false },
            ]}
            initialValue={data?.remarks}
            name="remarks"
            label="Remarks"
          />
        )}
      </ModalForm>
    </>
  );
};

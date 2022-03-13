import React, { useState } from "react";
import { Modal, Button } from "antd";
import ProTable, { TableDropdown } from "@ant-design/pro-table";
import moment from "moment";

import { getReportedDepartment } from "../../../services/dashboard";

export default ({ state, setState }) => {
  return (
    <>
      <Modal
        title="Respondents"
        centered
        visible={state}
        onOk={() => setState(false)}
        onCancel={() => setState(false)}
        width={1000}
      >
        <ProTable
          request={async () => {
            try {
              let res = await getReportedDepartment();
              return {
                data: res.reports,
              };
            } catch (err) {
              console.log(err);
            }
          }}
          columns={[
            {
              title: "Full Name",
              width: 80,
              dataIndex: "fullname",
            },
            {
              title: "Type",
              dataIndex: "raterType",
            },
            {
              title: "Issue",
              render: (dom, entity) => {
                return <strong>{entity?.reports?.join(". ")}</strong>;
              },
            },
            {
              title: "Date",
              dataIndex: "createdAt",
              render: (dom) => `${moment(dom).format("MMMM DD, YYYY")}`,
            },
          ]}
          rowKey="key"
          pagination={{
            showQuickJumper: true,
          }}
          search={false}
          dateFormatter="string"
          height={400}
        />
      </Modal>
    </>
  );
};

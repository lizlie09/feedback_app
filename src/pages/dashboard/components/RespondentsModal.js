import React, { useState } from "react";
import { Modal, Button } from "antd";
import ProTable, { TableDropdown } from "@ant-design/pro-table";
import moment from "moment";

import { getRespondents } from "../../../services/dashboard";

export default ({ state, setState, onSeeRatings, user }) => {
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
          request={async (params, sorter, filter) => {
            try {
              let res = await getRespondents({
                raterType: filter.raterType?.[0] || null,
                establishment:
                  user.mode === "assigned-officer" ? user?.name : undefined,
                ...params,
              });
              return {
                data: res.respondents,
              };
            } catch (err) {
              console.log(err);
            }
          }}
          columns={[
            {
              title: "Full Name",
              width:80,
              dataIndex: "fullname",
              search: false,
            },
            {
              title: "User Type",
              dataIndex: "raterType",
              filters: true,
              filterMultiple: false,
              search: false,
              valueEnum: {
                Doctor: { text: "Doctor" },
                Client: { text: "Client" },
                "Company Employee": { text: "Company Employee" },
                Visitor: { text: "Visitor" },
              },
            },
            {
              title: "Ratings",
              search: false,
              render: (dom, entity) => {
                if (entity?.rate) {
                  return (
                    <Button onClick={() => onSeeRatings(entity)}>
                      See Ratings
                    </Button>
                  );
                }
              },
            },
            {
              title: "Issues",       
              search: false,
              render: (dom, entity) => {
                return <strong>{entity?.reports?.join(". ")}</strong>;
              },
            },
            {
              title: "Date",
              dataIndex: "createdAt",
              valueType: "date",
              render: (dom, entity) =>
                `${moment(entity?.createdAt).format("MMMM DD, YYYY")}`,
            },
          ]}
          rowKey="key"
          pagination={{
            showQuickJumper: true,
            pageSize: 5,
          }}
          search={{
            filterType: "light",
          }}
          dateFormatter="string"
          height={400}
        />
      </Modal>
    </>
  );
};

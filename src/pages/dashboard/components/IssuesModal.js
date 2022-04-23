import React, { useEffect, useState, useRef } from "react";
import { Pie, G2 } from "@ant-design/plots";
import { Col, Row, Modal } from "antd";
import ProTable, { TableDropdown } from "@ant-design/pro-table";
import { EditOutlined } from "@ant-design/icons";
import { getReportedDepartment } from "../../../services/dashboard";
import moment from "moment";

export default ({ state, setState, offices }) => {
  return (
    <>
      <Modal
        title="Issues"
        centered
        visible={state}
        onOk={() => setState(false)}
        onCancel={() => setState(false)}
        width={1500}
      >
        <ProTable
          request={async (params, sorter, filter) => {
            console.log("Called");
            try {
              let res = await getReportedDepartment({
                remarks: filter?.remarks
                  ? filter?.remarks?.[0] === "1"
                    ? true
                    : false
                  : state === "resolved"
                  ? true
                  : null,
                establishment: filter.establishment?.[0] || null,
                ...params,
              });
              return {
                data: res.reports,
                total: res.total,
              };
            } catch (err) {
              console.log(err);
            }
          }}
          scroll={{ x: 1000 }}
          columns={[
            {
              title: "Name",
              width: 90,
              dataIndex: "establishment",
              filters: true,
              filterMultiple: false,
              valueEnum: offices,
              search: false,
            },
            {
              title: "Issues",
              render: (dom, entity) => {
                return <strong>{entity?.reports?.join(". ")}</strong>;
              },
              search: false,
            },
            {
              title: "Remarks",
              width: 90,
              dataIndex: "remarks",
              render: (dom, entity) => `${entity.remarks ? "Done" : "Pending"}`,
              filters: true,
              filterMultiple: false,
              defaultFilteredValue: state === "resolved" ? "1" : "0",
              valueEnum: {
                1: { text: "Done" },
                0: { text: "Pending" },
              },
              search: false,
            },
            {
              title: "Date",
              width: 90,
              dataIndex: "createdAt",
              valueType: "date",
              render: (dom, entity) =>
                `${moment(entity?.createdAt).format("MMMM DD, YYYY")}`,
            },
            // {
            //   title: "Actions",
            //   search: false,
            //   fixed: "right",
            //   width: 120,
            //   render: (dom, entity) => {
            //     return (
            //       <Button
            //         key="button"
            //         icon={<EditOutlined />}
            //         type="primary"
            //         onClick={() => {
            //           setSelectedReport({ mode: "reports", data: entity });
            //           setUpdateReport(true);
            //         }}
            //       >
            //         Update
            //       </Button>
            //     );
            //   },
            // },
          ]}
          rowKey="key"
          pagination={{
            pageSize: 5,
          }}
          search={{
            filterType: "light",
          }}
          dateFormatter="string"
          headerTitle="Overall Reported Offices"
        />
      </Modal>
    </>
  );
};

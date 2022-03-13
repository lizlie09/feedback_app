import React, { useEffect, useState } from "react";
import { Pie } from "@ant-design/plots";
import { Col, Row, Card, Button } from "antd";
import { DatePicker, Space } from "antd";
import ProTable, { TableDropdown } from "@ant-design/pro-table";
import { getRankings } from "../../services/ranking";
import moment from "moment";
const { RangePicker } = DatePicker;

export default () => {
  const getPercentage = (rate, increment) => {
    var getindex,
      totalindex,
      gettotal,
      total = 0;
    getindex = parseInt(increment) * 5;
    totalindex = parseInt(getindex) * 10;
    gettotal = parseFloat(rate / totalindex).toFixed(2);
    total = (gettotal * 100).toFixed(0);
    return total;
  };

  return (
    <div>
      <ProTable
        request={async (params, sorter, filter) => {
          console.log(filter?.year?.[0])
          try {
            let res = await getRankings({
              year: filter?.year?.[0] || undefined,
            });
            return {
              data: res.rankings,
            };
          } catch (err) {
            console.log(err);
          }
        }}
        columns={[
          {
            title: "Office/Department",
            dataIndex: "name",
          },
          {
            title: "Year",
            dataIndex: "year",
            filters: true,
            filterMultiple: false,
            valueEnum: {
              2021: { text: "2021" },
              2022: { text: "2022" },
              2023: { text: "2023" },
              2024: { text: "2024" },
              2025: { text: "2025" },
              2026: { text: "2026" },
              2027: { text: "2027" },
            },
          },
          {
            title: "Overall Percentage",
            render: (dom, entity) =>
              `${getPercentage(entity?.rate, entity?.increment)}%`,
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

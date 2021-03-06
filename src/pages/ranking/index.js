import React, { useEffect, useState } from "react";
import { Pie } from "@ant-design/plots";
import { Col, Row, Card, Button } from "antd";
import { DatePicker, Space } from "antd";
import ProTable, { TableDropdown } from "@ant-design/pro-table";
import { getRankings } from "../../services/ranking";
import { PageContainer } from "@ant-design/pro-layout";
import { history, Link } from "umi";
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
  const { location } = history;

  return (
    <PageContainer
      extra={
        location.pathname.includes("/admin/print/ranking") ? (
          <Button type="danger" onClick={() => window.print()}>
            Print Now
          </Button>
        ) : (
          <Link to="/admin/print/ranking" target="_blank">
            <Button type="primary">Preview Print</Button>
          </Link>
        )
      }
    >
      <ProTable
        request={async (params, sorter, filter) => {
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
            title: "Overall Percentage",
            sorter: true,
            defaultSortOrder: "descend",
            render: (dom, entity) =>
              `${getPercentage(entity?.rate, entity?.increment)}%`,
            sorter: (a, b) =>
              getPercentage(a?.rate, a?.increment) - getPercentage(b?.rate, b?.increment),
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
        ]}
        rowKey="key"
        pagination={{
          showQuickJumper: true,
        }}
        search={false}
        dateFormatter="string"
        headerTitle="Overall Rankings of Offices"
      />
    </PageContainer>
  );
};

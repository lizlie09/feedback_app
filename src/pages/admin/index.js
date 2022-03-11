import { Pie } from "@ant-design/plots";
import { Col, Row, Card } from "antd";
import { DatePicker, Space } from "antd";
import ProTable, { TableDropdown } from "@ant-design/pro-table";
const { RangePicker } = DatePicker;

export default () => {
  const data = [
    {
      type: "分类一",
      value: 27,
    },
    {
      type: "分类二",
      value: 25,
    },
    {
      type: "分类三",
      value: 18,
    },
    {
      type: "分类四",
      value: 15,
    },
    {
      type: "分类五",
      value: 10,
    },
    {
      type: "其他",
      value: 5,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };

  const gridStyle = {
    textAlign: "center",
  };

  const columns = [
    {
      title: "应用名称",
      width: 80,
      dataIndex: "name",
      render: (_) => <a>{_}</a>,
    },
    {
      title: "容器数量",
      dataIndex: "containers",
      align: "right",
      sorter: (a, b) => a.containers - b.containers,
    },
    {
      title: "状态",
      width: 80,
      dataIndex: "status",
      initialValue: "all",
      valueEnum: {
        all: { text: "全部", status: "Default" },
        close: { text: "关闭", status: "Default" },
        running: { text: "运行中", status: "Processing" },
        online: { text: "已上线", status: "Success" },
        error: { text: "异常", status: "Error" },
      },
    },
  ];

  return (
    <div>
      <Row>
        <Col span={12}>
          <Pie {...config} />
        </Col>
        <Col span={12}>
          <Card extra={<RangePicker />}>
            <Card title="Performance">
              <Card.Grid style={gridStyle}>Courtesy</Card.Grid>
              <Card.Grid hoverable={false} style={gridStyle}>
                Accuracy
              </Card.Grid>
              <Card.Grid style={gridStyle}>Responsiveness</Card.Grid>
              <Card.Grid style={gridStyle}>Professionalism</Card.Grid>
              <Card.Grid style={gridStyle}>Cleanliness</Card.Grid>
              <Card.Grid style={gridStyle}>Health Protocol</Card.Grid>
              <Card.Grid style={gridStyle}>Timeliness</Card.Grid>
              <Card.Grid style={gridStyle}>Service Efficiency</Card.Grid>
              <Card.Grid style={gridStyle}>Fairness</Card.Grid>
              <Card.Grid style={gridStyle}>Overall Services</Card.Grid>
            </Card>
            ,
          </Card>
        </Col>
      </Row>
      <div style={{ height: 10 }} />
      <Row gutter={5}>
        <Col span={8}>
          <ProTable
            columns={columns}
            rowKey="key"
            pagination={{
              showQuickJumper: true,
            }}
            search={false}
            dateFormatter="string"
            headerTitle="Offices"
          />
        </Col>
        <Col span={8}>
          <ProTable
            columns={columns}
            rowKey="key"
            pagination={{
              showQuickJumper: true,
            }}
            search={false}
            dateFormatter="string"
            headerTitle="Offices"
          />
        </Col>
        <Col span={8}>
          <ProTable
            columns={columns}
            rowKey="key"
            pagination={{
              showQuickJumper: true,
            }}
            search={false}
            dateFormatter="string"
            headerTitle="Offices"
          />
        </Col>
      </Row>
    </div>
  );
};

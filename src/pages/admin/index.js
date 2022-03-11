import React, { useEffect, useState } from "react";
import { Pie } from "@ant-design/plots";
import { Col, Row, Card } from "antd";
import { DatePicker, Space } from "antd";
import ProTable, { TableDropdown } from "@ant-design/pro-table";
import {
  getPerformance,
  getReportedDepartment,
  getComments,
  getRatertypes,
} from "../../services/dashboard";
import moment from "moment";
const { RangePicker } = DatePicker;

export default () => {
  let [performance, setPerformance] = useState({});
  let [raterTypes, setRaterTypes] = useState([]);

  const _getPerformance = async () => {
    let res = await getPerformance();
    if (res.success) {
      setPerformance(res.rate);
    }
  };

  const _getRatertypes = async () => {
    let res = await getRatertypes();
    if (res.success) {
      let temp = res?.raterTypes?.map((data) => {
        return {
          type: data._id,
          value: data.total,
        };
      });
      setRaterTypes(temp);
    }
  };

  useState(() => {
    _getPerformance();
    _getRatertypes();
  }, []);

  const config = {
    appendPadding: 10,
    data: raterTypes,
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

  const getPercentage = function (input, index) {
    let getpercentage,
      gettotal,
      total = 0;

    getpercentage = parseInt(index) * 5;
    gettotal = parseFloat(input / getpercentage).toFixed(2);
    total = (gettotal * 100).toFixed(0);
    return total;
  };

  return (
    <div>
      <Row>
        <Col span={12}>
          <Card>
            <Pie {...config} />
          </Card>
        </Col>
        <Col span={12}>
          <Card extra={<RangePicker />}>
            <Card title="Performance">
              <Card.Grid style={gridStyle}>
                {" "}
                {getPercentage(performance.rateOne, performance.Cnt)}% Courtesy
              </Card.Grid>
              <Card.Grid hoverable={false} style={gridStyle}>
                {getPercentage(performance.rateTwo, performance.Cnt)}% Accuracy
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                {getPercentage(performance.rateThree, performance.Cnt)}%
                Professionalism
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                {getPercentage(performance.rateFour, performance.Cnt)}%
                Cleanliness
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                {getPercentage(performance.rateFive, performance.Cnt)}% Health
                Protocol
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                {getPercentage(performance.rateSix, performance.Cnt)}%
                Timeliness
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                {getPercentage(performance.rateSeven, performance.Cnt)}% Service
                Efficiency
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                {getPercentage(performance.rateEight, performance.Cnt)}%
                Fairness
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                {getPercentage(performance.rateNine, performance.Cnt)}% Overall
                Services
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                {getPercentage(performance.rateTen, performance.Cnt)}%
                Responsiveness
              </Card.Grid>
            </Card>
          </Card>
        </Col>
      </Row>
      <div style={{ height: 10 }} />
      <Row gutter={5}>
        <Col span={8}>
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
                title: "Name",
                width: 80,
                dataIndex: "establishment",
              },
              // {
              //   title: "Issue",
              //   render: (dom, entity) => {
              //     return (
              //       <div>
              //         {entity?.reports?.map((data) => {
              //           return <p>- {data}</p>;
              //         })}
              //       </div>
              //     );
              //   },
              // },
              {
                title: "Remarks",
                dataIndex: "remarks",
                render: (dom) => `${dom ? "Done" : "Pending"}`,
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
            headerTitle="Reported Department"
          />
        </Col>
        <Col span={8}>
          <ProTable
            request={async () => {
              try {
                let res = await getComments();
                return {
                  data: res.comments,
                };
              } catch (err) {
                console.log(err);
              }
            }}
            columns={[
              {
                title: "Customer Concerns",
                width: 80,
                dataIndex: "rateComment",
              },
              {
                title: "Remarks",
                dataIndex: "remarks",
                render: (dom) => (dom ? "Done" : "Pending"),
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
            headerTitle="Overall Comments"
          />
        </Col>
        {/* <Col span={8}>
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
        </Col> */}
      </Row>
    </div>
  );
};

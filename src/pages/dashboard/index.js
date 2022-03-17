import React, { useEffect, useState, useRef } from "react";
import { Pie } from "@ant-design/plots";
import { Col, Row, Card, Button } from "antd";
import { DatePicker, Space } from "antd";
import ProTable, { TableDropdown } from "@ant-design/pro-table";
import RespondentsModal from "./components/RespondentsModal";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import {
  getPerformance,
  getReportedDepartment,
  getComments,
  getRatertypes,
  getAssignedOfficeComments,
} from "../../services/dashboard";
import moment from "moment";
const { RangePicker } = DatePicker;
import UpdateReport from "./components/UpdateReport";
import SeeRating from "./components/SeeRating";
import store from "store";
import { PageContainer } from "@ant-design/pro-layout";
import { getOffices } from "../../services/office";

export default () => {
  let user = store.get("user");
  let [performance, setPerformance] = useState({});
  let [raterTypes, setRaterTypes] = useState([]);
  let [respondentsModal, setRespondentsModal] = useState(false);
  let [updateReport, setUpdateReport] = useState(false);
  let [selectedReport, setSelectedReport] = useState({});
  let [seeRatings, setSeeRatings] = useState(false);
  let reportsTableRef = useRef();

  let [offices, setOffices] = useState({});

  useEffect(() => {
    const fetchOffices = async () => {
      let res = await getOffices();
      if (res.success) {
        res?.offices?.forEach((data) => {
          offices[data.name] = { text: data.name };
        });
        setOffices(offices);
      } else {
        message.error("Failed to fetch offices");
      }
    };
    fetchOffices();
  }, []);

  const _getPerformance = async (query) => {
    let res = await getPerformance(query);
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

  const onDateChange = (value, dateString) => {
    _getPerformance({
      startDate: value
        ? moment(value[0]).format("YYYY-MM-DD")
        : moment().subtract(14, "days").format("YYYY-MM-DD"),
      endDate: value
        ? moment(value[1]).format("YYYY-MM-DD")
        : moment(new Date(), "DD MMMM, YYYY").format("YYYY-MM-DD"),
    });
  };

  let AdminTable = () => {
    return (
      <Row gutter={10}>
        <Col span={12}>
          <ProTable
            actionRef={reportsTableRef}
            request={async (params, sorter, filter) => {
              try {
                let res = await getReportedDepartment({
                  remarks: filter?.remarks
                    ? filter?.remarks?.[0] === "1"
                      ? true
                      : false
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
            columns={[
              {
                title: "Name",
                width: 80,
                dataIndex: "establishment",
                filters: true,
                filterMultiple: false,
                valueEnum: offices,
              },
              {
                title: "Issue",
                render: (dom, entity) => {
                  return <strong>{entity?.reports?.join(". ")}</strong>;
                },
              },
              {
                title: "Remarks",
                dataIndex: "remarks",
                render: (dom, entity) =>
                  `${entity.remarks ? "Done" : "Pending"}`,
                filters: true,
                filterMultiple: false,
                valueEnum: {
                  1: { text: "Done" },
                  0: { text: "Pending" },
                },
              },
              {
                title: "Date",
                dataIndex: "createdAt",
                render: (dom) => `${moment(dom).format("MMMM DD, YYYY")}`,
              },
              {
                title: "Actions",
                render: (dom, entity) => {
                  return (
                    <Button
                      key="button"
                      icon={<EditOutlined />}
                      type="primary"
                      onClick={() => {
                        setSelectedReport({ mode: "reports", data: entity });
                        setUpdateReport(true);
                      }}
                    >
                      Update
                    </Button>
                  );
                },
              },
            ]}
            rowKey="key"
            pagination={{
              pageSize: 10,
            }}
            search={false}
            dateFormatter="string"
            headerTitle="Reported Department"
          />
        </Col>
        <Col span={12}>
          <ProTable
            request={async (params, sorter, filter) => {
              try {
                let res = await getComments({
                  remarks: filter?.remarks
                    ? filter?.remarks?.[0] === "1"
                      ? true
                      : false
                    : null,
                  ...params,
                });
                return {
                  data: res.comments,
                  total: res?.total
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
                render: (dom, entity) => (entity?.remarks ? "Done" : "Pending"),
                filters: true,
                filterMultiple: false,
                valueEnum: {
                  1: { text: "Done" },
                  0: { text: "Pending" },
                },
              },
              {
                title: "Date",
                dataIndex: "createdAt",
                render: (dom) => `${moment(dom).format("MMMM DD, YYYY")}`,
                valueType: "dateTime",
              },
              {
                title: "Actions",
                render: (dom, entity) => {
                  return (
                    <Button
                      key="button"
                      icon={<EditOutlined />}
                      type="primary"
                      onClick={() => {
                        setSelectedReport({ mode: "comments", data: entity });
                        setUpdateReport(true);
                      }}
                    >
                      Update
                    </Button>
                  );
                },
              },
            ]}
            rowKey="key"
            pagination={{
              pageSize: 10,
            }}
            search={false}
            dateFormatter="string"
            headerTitle="Overall Comments"
          />{" "}
        </Col>
      </Row>
    );
  };

  const AssignedOfferTable = () => {
    return (
      <ProTable
        request={async () => {
          try {
            let res = await getAssignedOfficeComments({
              officeName: user.name,
            });
            return {
              data: res.comments,
            };
          } catch (err) {
            console.log(err);
          }
        }}
        columns={[
          {
            title: "Name",
            dataIndex: "fullname",
          },
          {
            title: "Ratings",
            title: "Reports",
            render: (dom, entity) => {
              return (
                <Button
                  onClick={() => {
                    setSeeRatings(true);
                    setSelectedReport(entity);
                  }}
                >
                  See Ratings
                </Button>
              );
            },
          },
          {
            title: "Comments",
            dataIndex: "rateComment",
          },
          {
            title: "Reports",
            render: (dom, entity) => {
              return <strong>{entity?.reports?.join(". ")}</strong>;
            },
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
          {
            title: "Actions",
            render: (dom, entity) => {
              return (
                <Button
                  key="button"
                  icon={<EditOutlined />}
                  type="primary"
                  onClick={() => {
                    setSelectedReport({
                      mode: "assigned-officer",
                      data: entity,
                    });
                    setUpdateReport(true);
                  }}
                >
                  Update
                </Button>
              );
            },
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
    );
  };
  console.log(user);
  return (
    <PageContainer
      title={user.mode === "admin" ? "Dashboard" : user.name}
      extra={<RangePicker />}
    >
      <RespondentsModal
        state={respondentsModal}
        setState={setRespondentsModal}
        onSeeRatings={(item) => {
          setSeeRatings(true);
          setSelectedReport(item);
        }}
      />
      <UpdateReport
        state={updateReport}
        setState={setUpdateReport}
        selectedReport={selectedReport}
        actionRef={reportsTableRef}
      />
      <SeeRating
        state={seeRatings}
        setState={setSeeRatings}
        comment={selectedReport}
      />
      <Row gutter={10}>
        <Col span={12}>
          <Card
            title={"Respondents"}
            extra={
              <Button type="primary" onClick={() => setRespondentsModal(true)}>
                See respondents
              </Button>
            }
          >
            <Pie {...config} />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="Performance"
            extra={<RangePicker onChange={onDateChange} />}
          >
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
              {getPercentage(performance.rateSix, performance.Cnt)}% Timeliness
            </Card.Grid>
            <Card.Grid style={gridStyle}>
              {getPercentage(performance.rateSeven, performance.Cnt)}% Service
              Efficiency
            </Card.Grid>
            <Card.Grid style={gridStyle}>
              {getPercentage(performance.rateEight, performance.Cnt)}% Fairness
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
        </Col>
      </Row>
      <div style={{ height: 10 }} />
      {user.mode === "admin" && <AdminTable />}
      {user.mode === "assigned-officer" && <AssignedOfferTable />}
    </PageContainer>
  );
};

import React, { useEffect, useState, useRef } from "react";
import { Pie } from "@ant-design/plots";
import {
  Col,
  Row,
  Card,
  Button,
  DatePicker,
  TimePicker,
  Select,
  Space,
  Radio,
} from "antd";
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

const { Option } = Select;

export default () => {
  let user = store.get("user");
  let [performance, setPerformance] = useState({});
  let [raterTypes, setRaterTypes] = useState([]);
  let [respondentsModal, setRespondentsModal] = useState(false);
  let [updateReport, setUpdateReport] = useState(false);
  let [selectedReport, setSelectedReport] = useState({});
  let [seeRatings, setSeeRatings] = useState(false);
  let [type, setType] = useState("month");
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

  const _getPerformance = async ({ overallFilter, startDate, endDate }) => {
    let res = await getPerformance({
      overallFilter: overallFilter ? JSON.stringify(overallFilter) : null,
      startDate,
      endDate,
    });
    if (res.success) {
      setPerformance(res.rate);
    }
  };

  const _getRatertypes = async ({ overallFilter }) => {
    let res = await getRatertypes({
      overallFilter: overallFilter ? JSON.stringify(overallFilter) : null,
      establishment: user?.mode === "assigned-officer" ? user?.name : undefined,
    });
    if (res.success) {
      let temp = res?.raterTypes?.map((data) => {
        return {
          type: `${data.total} - ${data._id}`,
          value: data.total,
        };
      });
      setRaterTypes(temp);
    }
  };

  useState(() => {
    _getPerformance({});
    _getRatertypes({});
  }, []);

  const config = {
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
              console.log(params);
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
                search: false,
              },
              {
                title: "Issue",
                render: (dom, entity) => {
                  return <strong>{entity?.reports?.join(". ")}</strong>;
                },
                search: false,
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
                search: false,
              },
              {
                title: "Date",
                dataIndex: "createdAt",
                valueType: "date",
                render: (dom, entity) =>
                  `${moment(entity?.createdAt).format("MMMM DD, YYYY")}`,
              },
              {
                title: "Actions",
                search: false,
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
            search={{
              filterType: "light",
            }}
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
                  total: res?.total,
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
                search: false,
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
                search: false,
              },
              {
                title: "Date",
                dataIndex: "createdAt",
                render: (dom, entity) =>
                  `${moment(entity?.createdAt).format("MMMM DD, YYYY")}`,
                valueType: "date",
              },
              {
                title: "Actions",
                search: false,
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
            search={{
              filterType: "light",
            }}
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
        request={async (params, sorter, filter) => {
          try {
            let res = await getAssignedOfficeComments({
              officeName: user.name,
              remarks: filter?.remarks
                ? filter?.remarks?.[0] === "1"
                  ? true
                  : false
                : null,
              ...params,
            });
            return {
              data: res.comments,
              total: res?.total,
            };
          } catch (err) {
            console.log(err);
          }
        }}
        columns={[
          {
            title: "Name",
            dataIndex: "fullname",
            search: false
          },
          {
            title: "Ratings",
            title: "Reports",
            search: false,
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
            search: false,
          },
          {
            title: "Reports",
            render: (dom, entity) => {
              return <strong>{entity?.reports?.join(". ")}</strong>;
            },
            search: false,
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
            search: false,
          },
          {
            title: "Date",
            dataIndex: "createdAt",
            valueType: "date",
            render: (dom, entity) =>
              `${moment(entity?.createdAt).format("MMMM DD, YYYY")}`,
          },
          {
            title: "Actions",
            search: false,
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
          pageSize: 10,
        }}
        search={{
          filterType: "light",
        }}
        dateFormatter="string"
        headerTitle="Overall Comments"
      />
    );
  };

  function PickerWithType({ type, onChange }) {
    return <DatePicker picker={type} onChange={onChange} />;
  }

  function SwitchablePicker() {
    return (
      <Space>
        <Radio.Group
          options={[
            {
              label: "Month",
              value: "month",
            },
            {
              label: "Quarter",
              value: "quarter",
            },
            {
              label: "Year",
              value: "year",
            },
          ]}
          initialValue={type}
          onChange={(data) => setType(data.target.value)}
          optionType="button"
          buttonStyle="solid"
        />
        <PickerWithType
          type={type}
          onChange={(value) => onSwitchablePickerChange(value, type)}
        />
      </Space>
    );
  }

  let onSwitchablePickerChange = (value, type) => {
    let overallFilter = {};

    if (type === "month") {
      overallFilter = { type, year: value.year(), month: value.format("MM") };
    }

    if (type === "quarter") {
      overallFilter = {
        type,
        year: value.year(),
        startMonth: value.format("MM"),
        endMonth: value.add(2, "M").format("MM"),
      };
    }

    if (type === "year") {
      overallFilter = {
        type,
        year: value.year(),
      };
    }

    _getRatertypes({ overallFilter });
    _getPerformance({ overallFilter });
  };

  const perfCardStyle = {
    backgroundColor: "#F3A931",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  };

  const perfPercetageStyle = {
    fontSize: 30,
    color: "white",
  };

  const perfLabelStyle = {
    color: "white",
  };

  return (
    <PageContainer
      title={user.mode === "admin" ? "Dashboard" : user.name}
      extra={<SwitchablePicker />}
    >
      <RespondentsModal
        state={respondentsModal}
        setState={setRespondentsModal}
        onSeeRatings={(item) => {
          setSeeRatings(true);
          setSelectedReport(item);
        }}
        user={user}
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
            style={{ height: "100%" }}
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
            <Row gutter={[5, 5]}>
              <Col span={8}>
                <Card
                  title={<span style={perfLabelStyle}>Courtesy</span>}
                  style={perfCardStyle}
                >
                  <span style={perfPercetageStyle}>
                    {getPercentage(performance.rateOne, performance.Cnt)}%
                  </span>
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  title={<span style={perfLabelStyle}>Accuracy</span>}
                  style={perfCardStyle}
                >
                  <span style={perfPercetageStyle}>
                    {getPercentage(performance.rateTwo, performance.Cnt)}%
                  </span>
                </Card>
              </Col>

              <Col span={8}>
                <Card
                  title={<span style={perfLabelStyle}>Professionalism</span>}
                  style={perfCardStyle}
                >
                  <span style={perfPercetageStyle}>
                    {getPercentage(performance.rateThree, performance.Cnt)}%
                  </span>
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  title={<span style={perfLabelStyle}>Cleanliness</span>}
                  style={perfCardStyle}
                >
                  <span style={perfPercetageStyle}>
                    {getPercentage(performance.rateFour, performance.Cnt)}%
                  </span>
                </Card>
              </Col>

              <Col span={8}>
                <Card
                  title={<span style={perfLabelStyle}>Protocol</span>}
                  style={perfCardStyle}
                >
                  <span style={perfPercetageStyle}>
                    {getPercentage(performance.rateFive, performance.Cnt)}%
                  </span>
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  title={<span style={perfLabelStyle}>Timeliness</span>}
                  style={perfCardStyle}
                >
                  <span style={perfPercetageStyle}>
                    {getPercentage(performance.rateSix, performance.Cnt)}%
                  </span>
                </Card>
              </Col>

              <Col span={8}>
                <Card
                  title={<span style={perfLabelStyle}>Service Efficiency</span>}
                  style={perfCardStyle}
                >
                  <span style={perfPercetageStyle}>
                    {getPercentage(performance.rateSeven, performance.Cnt)}%
                  </span>
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  title={<span style={perfLabelStyle}>Fairness</span>}
                  style={perfCardStyle}
                >
                  <span style={perfPercetageStyle}>
                    {getPercentage(performance.rateEight, performance.Cnt)}%
                  </span>
                </Card>
              </Col>

              <Col span={8}>
                <Card
                  title={<span style={perfLabelStyle}>Timeliness</span>}
                  style={perfCardStyle}
                >
                  <span style={perfPercetageStyle}>
                    {getPercentage(performance.rateSix, performance.Cnt)}%
                  </span>
                </Card>
              </Col>

              <Col span={8}>
                <Card
                  title={<span style={perfLabelStyle}>Overall Services</span>}
                  style={perfCardStyle}
                >
                  <span style={perfPercetageStyle}>
                    {getPercentage(performance.rateNine, performance.Cnt)}%
                  </span>
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  title={<span style={perfLabelStyle}>Responsiveness</span>}
                  style={perfCardStyle}
                >
                  <span style={perfPercetageStyle}>
                    {getPercentage(performance.rateTen, performance.Cnt)}%
                  </span>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <div style={{ height: 10 }} />
      {user.mode === "admin" && <AdminTable />}
      {user.mode === "assigned-officer" && <AssignedOfferTable />}
    </PageContainer>
  );
};

import React, { useEffect, useState, useRef } from "react";
import { Pie, G2 } from "@ant-design/plots";
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
import { PlusOutlined, EditOutlined, PrinterOutlined } from "@ant-design/icons";
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
import NoData from "@/components/NoData";
import { history, Link } from "umi";

const { Option } = Select;

export default () => {
  const user = store.get("user");
  const reportsTableRef = useRef();
  const commentsTableRef = useRef();
  const assignedOfficerTableRef = useRef();
  const { location } = history;

  const [performance, setPerformance] = useState({});
  const [selectedReport, setSelectedReport] = useState({});
  const [offices, setOffices] = useState({});
  const [raterTypes, setRaterTypes] = useState([]);
  const [respondentsModal, setRespondentsModal] = useState(false);
  const [updateReport, setUpdateReport] = useState(false);
  const [seeRatings, setSeeRatings] = useState(false);
  const [type, setType] = useState("month");
  const [overallFilterDate, setOverallFilterDate] = useState("");
  const [overallFilter, setOverallFilter] = useState(null);
  const [totalRespondents, setTotalRespondents] = useState(0);
  let [isFetchingRespondents, setIsFetchingRespondents] = useState(false);
  let [isFetchingPerformance, setIsFetchingPerformance] = useState(false);

  const _getPerformance = async ({ overallFilter, startDate, endDate }) => {
    setIsFetchingPerformance(true);
    let res = await getPerformance({
      overallFilter: overallFilter ? JSON.stringify(overallFilter) : null,
      establishment: user?.mode === "assigned-officer" ? user?.name : undefined,
      startDate,
      endDate,
    });
    if (res.success) {
      setPerformance(res.rate);
      setIsFetchingPerformance(false);
    }
  };

  const _getRatertypes = async ({ overallFilter }) => {
    setIsFetchingRespondents(true);
    let res = await getRatertypes({
      overallFilter: overallFilter ? JSON.stringify(overallFilter) : null,
      establishment: user?.mode === "assigned-officer" ? user?.name : undefined,
    });
    if (res.success) {
      let total = 0;
      let temp = res?.raterTypes?.map((data) => {
        total += data.total;
        return {
          type: `${data.total} - ${data._id}`,
          value: data.total,
        };
      });
      setTotalRespondents(total);
      setRaterTypes(temp);
      setIsFetchingRespondents(false);
    }
  };

  const _fetchOffices = async () => {
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

  useState(() => {
    _getPerformance({});
  }, []);

  useState(() => {
    _getRatertypes({});
  }, []);

  useState(() => {
    _fetchOffices();
  }, []);

  var config = {
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

  const perfCardStyle = {
    backgroundColor: "#F3A931",
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  };

  const perfPercetageStyle = {
    color: "white",
    fontSize: 25,
    lineHeight: 0,
  };

  const perfLabelStyle = {
    color: "white",
    fontSize: 15,
  };

  const Performance = () => {
    return (
      <Row gutter={[10, 10]}>
        <Col span={8}>
          <div style={perfCardStyle}>
            <p style={perfLabelStyle}>Courtesy</p>
            <p style={perfPercetageStyle}>
              {getPercentage(performance.rateOne, performance.Cnt)}%
            </p>
          </div>
        </Col>
        <Col span={8}>
          <div style={perfCardStyle}>
            <p style={perfLabelStyle}>Accuracy</p>
            <p style={perfPercetageStyle}>
              {getPercentage(performance.rateTwo, performance.Cnt)}%
            </p>
          </div>
        </Col>

        <Col span={8}>
          <div style={perfCardStyle}>
            <p style={perfLabelStyle}>Professionalism</p>
            <p style={perfPercetageStyle}>
              {getPercentage(performance.rateThree, performance.Cnt)}%
            </p>
          </div>
        </Col>
        <Col span={8}>
          <div style={perfCardStyle}>
            <p style={perfLabelStyle}>Cleanliness</p>
            <p style={perfPercetageStyle}>
              {getPercentage(performance.rateFour, performance.Cnt)}%
            </p>
          </div>
        </Col>

        <Col span={8}>
          <div style={perfCardStyle}>
            <p style={perfLabelStyle}>Protocol</p>
            <p style={perfPercetageStyle}>
              {getPercentage(performance.rateFive, performance.Cnt)}%
            </p>
          </div>
        </Col>
        <Col span={8}>
          <div style={perfCardStyle}>
            <p style={perfLabelStyle}>Timeliness</p>
            <p style={perfPercetageStyle}>
              {getPercentage(performance.rateSix, performance.Cnt)}%
            </p>
          </div>
        </Col>

        <Col span={8}>
          <div style={perfCardStyle}>
            <p style={perfLabelStyle}>Service Efficiency</p>
            <p style={perfPercetageStyle}>
              {getPercentage(performance.rateSeven, performance.Cnt)}%
            </p>
          </div>
        </Col>
        <Col span={8}>
          <div style={perfCardStyle}>
            <p style={perfLabelStyle}>Fairness</p>
            <p style={perfPercetageStyle}>
              {getPercentage(performance.rateEight, performance.Cnt)}%
            </p>
          </div>
        </Col>

        <Col span={8}>
          <div style={perfCardStyle}>
            <p style={perfLabelStyle}>Timeliness</p>
            <p style={perfPercetageStyle}>
              {getPercentage(performance.rateSix, performance.Cnt)}%
            </p>
          </div>
        </Col>

        <Col span={8}>
          <div style={perfCardStyle}>
            <p style={perfLabelStyle}>Overall Services</p>
            <p style={perfPercetageStyle}>
              {getPercentage(performance.rateNine, performance.Cnt)}%
            </p>
          </div>
        </Col>
        <Col span={8}>
          <div style={perfCardStyle}>
            <p style={perfLabelStyle}>Responsiveness</p>
            <p style={perfPercetageStyle}>
              {getPercentage(performance.rateTen, performance.Cnt)}%
            </p>
          </div>
        </Col>
      </Row>
    );
  };

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
          defaultValue={type}
          onChange={(data) => setType(data.target.value)}
          optionType="button"
          buttonStyle="solid"
        />
        <DatePicker
          picker={type}
          defaultValue={overallFilterDate}
          onChange={(value) => {
            setOverallFilterDate(value);
            onSwitchablePickerChange(value, type);
          }}
        />
        {location.pathname.includes("/admin/print/dashboard") ? (
          <Button
            type="danger"
            icon={<PrinterOutlined />}
            onClick={() => window.print()}
          >
            Print Now
          </Button>
        ) : (
          <Link to="/admin/print/dashboard" target="_blank">
            <Button icon={<PrinterOutlined />} type="primary">
              Preview Print
            </Button>
          </Link>
        )}
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
    setOverallFilter(overallFilter);
    reportsTableRef?.current?.reload?.();
    commentsTableRef?.current?.reload?.();
    assignedOfficerTableRef?.current?.reload?.();
  };

  if (location.pathname.includes("/admin/print/dashboard")) {
    config.label = {
      type: "outer",
      content: "{name} {percentage}",
    };

    return (
      <PageContainer
        title={user.mode === "admin" ? "Dashboard" : user.name}
        extra={<SwitchablePicker />}
      >
        <Card title={`${totalRespondents} Respondents`}>
          {raterTypes.length > 0 ? <Pie {...config} /> : <NoData />}
        </Card>
        <div style={{ height: 20 }} />
        <Card title="Performance">
          {performance?.Cnt ? <Performance /> : <NoData />}
        </Card>
        <div style={{ height: 10 }} />
        {user.mode === "admin" && (
          <>
            <Card>
              <ProTable
                actionRef={reportsTableRef}
                request={async (params, sorter, filter) => {
                  console.log(params);
                  try {
                    let res = await getReportedDepartment({
                      overallFilter: overallFilter
                        ? JSON.stringify(overallFilter)
                        : null,
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
                scroll={{ x: 700 }}
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
                    width: 90,
                    dataIndex: "createdAt",
                    valueType: "date",
                    render: (dom, entity) =>
                      `${moment(entity?.createdAt).format("MMMM DD, YYYY")}`,
                  },
                ]}
                rowKey="key"
                pagination={{
                  pageSize: 6,
                }}
                search={{
                  filterType: "light",
                }}
                dateFormatter="string"
                headerTitle="Overall Reported Offices"
              />
            </Card>
            <div style={{ height: 10 }} />
            <Card>
              <ProTable
                actionRef={commentsTableRef}
                request={async (params, sorter, filter) => {
                  try {
                    let res = await getComments({
                      overallFilter: overallFilter
                        ? JSON.stringify(overallFilter)
                        : null,
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
                    title: "Comments and Suggestions",
                    width: 100,
                    dataIndex: "rateComment",
                    search: false,
                  },
                  {
                    title: "Remarks",
                    width: 90,
                    dataIndex: "remarks",
                    render: (dom, entity) =>
                      entity?.remarks ? "Done" : "Pending",
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
                    width: 90,
                    dataIndex: "createdAt",
                    render: (dom, entity) =>
                      `${moment(entity?.createdAt).format("MMMM DD, YYYY")}`,
                    valueType: "date",
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
                headerTitle="Overall Comments and Suggestions"
              />
            </Card>
          </>
        )}

        {user.mode === "assigned-officer" && (
          <Card>
            <ProTable
              actionRef={assignedOfficerTableRef}
              request={async (params, sorter, filter) => {
                try {
                  let res = await getAssignedOfficeComments({
                    overallFilter: overallFilter
                      ? JSON.stringify(overallFilter)
                      : null,
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
                  search: false,
                },

                {
                  title: "Comments and Suggestions",
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
                  render: (dom, entity) =>
                    entity?.remarks ? "Done" : "Pending",
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
              ]}
              search={{
                filterType: "light",
              }}
              headerTitle="Overall Rating/Reports/Comments and Suggestions"
            />
          </Card>
        )}
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title={user.mode === "admin" ? "Dashboard" : user.name}
      extra={<SwitchablePicker />}
    >
      {respondentsModal && (
        <RespondentsModal
          state={respondentsModal}
          setState={setRespondentsModal}
          onSeeRatings={(item) => {
            setSeeRatings(true);
            setSelectedReport(item);
          }}
          user={user}
        />
      )}
      {updateReport && (
        <UpdateReport
          state={updateReport}
          setState={setUpdateReport}
          selectedReport={selectedReport}
          actionRef={reportsTableRef}
          commentsTableRef={commentsTableRef}
          assignedOfficerTableRef={assignedOfficerTableRef}
        />
      )}
      {seeRatings && (
        <SeeRating
          state={seeRatings}
          setState={setSeeRatings}
          comment={selectedReport}
        />
      )}
      <Row gutter={10}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Card
            loading={isFetchingRespondents}
            title={`Respondents (Total ${totalRespondents})`}
            extra={
              <Button type="primary" onClick={() => setRespondentsModal(true)}>
                See respondents
              </Button>
            }
          >
            {raterTypes.length > 0 ? <Pie {...config} /> : <NoData />}
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Card
            loading={isFetchingPerformance}
            style={{ height: "100%" }}
            title="Performance"
            extra={<RangePicker onChange={onDateChange} />}
          >
            {performance?.Cnt ? <Performance /> : <NoData />}
          </Card>
        </Col>
      </Row>
      <div style={{ height: 10 }} />
      {/* ADMIN TABLE HERE */}
      {user.mode === "admin" && (
        <Row gutter={10}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <ProTable
              actionRef={reportsTableRef}
              request={async (params, sorter, filter) => {
                console.log(params);
                try {
                  let res = await getReportedDepartment({
                    overallFilter: overallFilter
                      ? JSON.stringify(overallFilter)
                      : null,
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
                  width: 90,
                  dataIndex: "createdAt",
                  valueType: "date",
                  render: (dom, entity) =>
                    `${moment(entity?.createdAt).format("MMMM DD, YYYY")}`,
                },
                {
                  title: "Actions",
                  search: false,
                  fixed: "right",
                  width: 120,
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
                pageSize: 5,
              }}
              search={{
                filterType: "light",
              }}
              dateFormatter="string"
              headerTitle="Overall Reported Offices"
            />
            <div style={{ height: 10 }} />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <ProTable
              actionRef={commentsTableRef}
              request={async (params, sorter, filter) => {
                try {
                  let res = await getComments({
                    overallFilter: overallFilter
                      ? JSON.stringify(overallFilter)
                      : null,
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
              scroll={{ x: 1000 }}
              columns={[
                {
                  title: "Comments and Suggestions",
                  width: 100,
                  dataIndex: "rateComment",
                  search: false,
                },
                {
                  title: "Remarks",
                  width: 90,
                  dataIndex: "remarks",
                  render: (dom, entity) =>
                    entity?.remarks ? "Done" : "Pending",
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
                  width: 90,
                  dataIndex: "createdAt",
                  render: (dom, entity) =>
                    `${moment(entity?.createdAt).format("MMMM DD, YYYY")}`,
                  valueType: "date",
                },
                {
                  title: "Actions",
                  fixed: "right",
                  search: false,
                  width: 40,
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
                pageSize: 5,
              }}
              search={{
                filterType: "light",
              }}
              dateFormatter="string"
              headerTitle="Overall Comments and Suggestions"
            />{" "}
          </Col>
        </Row>
      )}
      {/* ASSIGNED OFFICER TABLE HERE */}
      {user.mode === "assigned-officer" && (
        <ProTable
          actionRef={assignedOfficerTableRef}
          request={async (params, sorter, filter) => {
            try {
              let res = await getAssignedOfficeComments({
                overallFilter: overallFilter
                  ? JSON.stringify(overallFilter)
                  : null,
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
              search: false,
            },
            {
              title: "Ratings",
              dataIndex: "ratings",
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
              title: "Comments and Suggestions",
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
            pageSize: 5,
          }}
          search={{
            filterType: "light",
          }}
          dateFormatter="string"
          headerTitle="Overall Rating/Reports/Comments and Suggestions"
        />
      )}
    </PageContainer>
  );
};

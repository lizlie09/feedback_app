import React, { useState } from "react";
import ProForm, {
  ModalForm,
  DrawerForm,
  QueryFilter,
  LightFilter,
  StepsForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormRadio,
  ProFormRate,
  ProFormTextArea,
  ProFormCheckbox,
} from "@ant-design/pro-form";
import { Tabs, Tag, Radio, Card, Col, Row, message } from "antd";
import { rate, report } from "@/services/rate";
import { history } from "umi";

const { TabPane } = Tabs;

export default () => {
  const RatingView = () => {
    return (
      <Card>
        <ProForm
          onFinish={async (value) => {
            let res = await rate(value);
            try {
              if (res.success) {
                message.success(res.message);
                history.push("/user/login");
              } else {
                message.error(res.message);
              }
            } catch (error) {
              message.error("Server error");
            }
          }}
        >
          <ProFormRadio.Group
            name={"raterType"}
            style={{
              margin: 16,
            }}
            radioType="button"
            options={["Doctor", "Client", "Company Employee", "Visitor"]}
          />
          <ProFormRadio.Group
            name={"establishment"}
            style={{
              margin: 16,
            }}
            radioType="button"
            options={["Accounting Office", "Finance Office"]}
          />
          <ProFormText
            name="fullname"
            label="Full Name"
            placeholder="Enter fullname"
          />
          <Row gutter={16}>
            <Tag color="gold">5 Stars - Very Satisfied</Tag>
            <Tag color="gold">4 Stars - Satisfied</Tag>
            <Tag color="gold">3 Stars - Neutral</Tag>
            <Tag color="gold">2 Stars - Dissatisfied</Tag>
            <Tag color="gold">1 Stars - Very Dissatisfied</Tag>
          </Row>
          <div style={{ height: 20 }} />
          <Row gutter={24}>
            <Col span={5}>
              <ProFormRate name="star1" label="Courtesy" />
              <ProFormRate name="star2" label="Cleanliness" />
            </Col>
            <Col span={5}>
              <ProFormRate name="star3" label="Ground Landscaping" />
              <ProFormRate name="star4" label="Water System" />
            </Col>
            <Col span={5}>
              <ProFormRate name="star5" label="Biosecurity" />
              <ProFormRate name="star6" label="Responsiveness" />
            </Col>
            <Col span={5}>
              <ProFormRate name="star7" label="Health Protocol" />
              <ProFormRate name="star8" label="Painted Walls" />
            </Col>
            <Col span={4}>
              <ProFormRate name="star9" label="Adequate Lightning" />
              <ProFormRate name="star10" label="Garbage Bin Labeled" />
            </Col>
          </Row>

          <ProFormTextArea
            name="rateComment"
            label="Comments and Suggestions"
            width="lg"
            placeholder="Type here..."
          />
        </ProForm>
      </Card>
    );
  };

  const ReportView = () => {
    return (
      <Card>
        <ProForm
          onFinish={async (value) => {
            let res = await report(value);
            try {
              if (res.success) {
                message.success(res.message);
                history.push("/user/login");
              } else {
                message.error(res.message);
              }
            } catch (error) {
              message.error("Server error");
            }
          }}
        >
          <ProFormRadio.Group
            name={"raterType"}
            style={{
              margin: 16,
            }}
            radioType="button"
            options={["Doctor", "Client", "Company Employee", "Visitor"]}
          />
          <ProFormRadio.Group
            style={{
              margin: 16,
            }}
            name="establishment"
            radioType="button"
            options={["Accounting Office", "Finance Office"]}
          />
          <ProFormText
            name="fullname"
            label="Full Name"
            placeholder="Enter fullname"
          />
          <ProFormCheckbox.Group
            name="reports"
            layout="vertical"
            label="Reports"
            options={[
              "Refusal To Obey Legitimate Management Instructions",
              "Negligence In Performance Of Duties",
              "Absenteeism And Leaving The Workplace Without Permission",
              "Miss Conduct In Relationships With Fellow Employees Or Clients In The Public",
              "Damage To Council Property",
              "Swearing Or Verbal Abuse Of Fellow Employees Or Client In The Public",
              "Unauthorized Use Of Councils Facilities ( Ex. Tools, Equipment’s And Vehicles)",
            ]}
          />
          <ProFormTextArea
            name="reports_comment"
            label="Comments and Suggestions"
            width="lg"
            placeholder="Type here..."
          />
        </ProForm>
      </Card>
    );
  };

  return (
    <div>
      <h1>Rate</h1>
      <h3>Select Department</h3>
      <Tabs
        defaultActiveKey="1"
        style={{ marginBottom: 32 }}
        destroyInactiveTabPane={true}
      >
        <TabPane tab="Click to Rate" key="1">
          <RatingView />
        </TabPane>
        <TabPane tab="Click to Report" key="2">
          <ReportView />
        </TabPane>
      </Tabs>
    </div>
  );
};

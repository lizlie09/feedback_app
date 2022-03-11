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
import { Tabs, Tag, Radio, Card, Col, Row } from "antd";

const { TabPane } = Tabs;

export default () => {
  const RatingView = () => {
    return (
      <Card>
        <ProForm
          onValuesChange={(_, values) => {
            console.log(values);
          }}
          onFinish={async (value) => console.log(value)}
        >
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
              <ProFormRate name="rate" label="Courtesy" />
              <ProFormRate name="rate" label="Cleanliness" />
            </Col>
            <Col span={5}>
              <ProFormRate name="rate" label="Ground Landscaping" />
              <ProFormRate name="rate" label="Water System" />
            </Col>
            <Col span={5}>
              <ProFormRate name="rate" label="Biosecurity" />
              <ProFormRate name="rate" label="Responsiveness" />
            </Col>
            <Col span={5}>
              <ProFormRate name="rate" label="Health Protocol" />
              <ProFormRate name="rate" label="Painted Walls" />
            </Col>
            <Col span={4}>
              <ProFormRate name="rate" label="Adequate Lightning" />
              <ProFormRate name="rate" label="Garbage Bin Labeled" />
            </Col>
          </Row>

          <ProFormTextArea
            name="comment"
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
        <ProFormCheckbox.Group
          name="checkbox-group"
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
          name="comment"
          label="Comments and Suggestions"
          width="lg"
          placeholder="Type here..."
        />
      </Card>
    );
  };

  return (
    <div>
      <h1>Rate</h1>
      <h3>Select Department</h3>
      <ProFormRadio.Group
        style={{
          margin: 16,
        }}
        radioType="button"
        fieldProps={{}}
        options={["Accounting Office", "Finance Office"]}
      />
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

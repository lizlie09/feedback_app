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
import { useLocation } from "react-router-dom";

const { TabPane } = Tabs;

export default () => {
  const location = useLocation();
  let { fullname, raterType } = location.state;

  const RatingView = () => {
    return (
      <Card>
        <ProForm
          onFinish={async (value) => {
            let res = await rate({ ...value, fullname, raterType });
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
            name={"establishment"}
            style={{
              margin: 16,
            }}
            rules={[
              {
                required: true,
              },
            ]}
            radioType="button"
            label="Select Office"
            options={["Accounting Office", "Finance Office"]}
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
              <ProFormRate
                rules={[
                  {
                    required: true,
                  },
                ]}
                name="star1"
                label="Courtesy"
              />
              <ProFormRate
                rules={[
                  {
                    required: true,
                  },
                ]}
                name="star2"
                label="Cleanliness"
              />
            </Col>
            <Col span={5}>
              <ProFormRate
                rules={[
                  {
                    required: true,
                  },
                ]}
                name="star3"
                label="Ground Landscaping"
              />
              <ProFormRate
                rules={[
                  {
                    required: true,
                  },
                ]}
                name="star4"
                label="Water System"
              />
            </Col>
            <Col span={5}>
              <ProFormRate
                rules={[
                  {
                    required: true,
                  },
                ]}
                name="star5"
                label="Biosecurity"
              />
              <ProFormRate
                rules={[
                  {
                    required: true,
                  },
                ]}
                name="star6"
                label="Responsiveness"
              />
            </Col>
            <Col span={5}>
              <ProFormRate
                rules={[
                  {
                    required: true,
                  },
                ]}
                name="star7"
                label="Health Protocol"
              />
              <ProFormRate
                rules={[
                  {
                    required: true,
                  },
                ]}
                name="star8"
                label="Painted Walls"
              />
            </Col>
            <Col span={4}>
              <ProFormRate
                rules={[
                  {
                    required: true,
                  },
                ]}
                name="star9"
                label="Adequate Lightning"
              />
              <ProFormRate
                rules={[
                  {
                    required: true,
                  },
                ]}
                name="star10"
                label="Garbage Bin Labeled"
              />
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
            let res = await report({ ...value, fullname, raterType });
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
            style={{
              margin: 16,
            }}
            name="establishment"
            radioType="button"
            label="Select Office"
            options={["Accounting Office", "Finance Office"]}
            rules={[
              {
                required: true,
              },
            ]}
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
            rules={[
              {
                required: true,
              },
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
      <h1>Hello, {fullname}</h1>
      <h4>{raterType}</h4>
      <Card>
        <Tabs
          defaultActiveKey="1"
          style={{ marginBottom: 32 }}
          destroyInactiveTabPane={true}
        >
          <TabPane tab="Click to Rate" key="1">
            <RatingView />
          </TabPane>
          {raterType !== "Visitor" && (
            <TabPane tab="Click to Report" key="2">
              <ReportView />
            </TabPane>
          )}
        </Tabs>
      </Card>
    </div>
  );
};

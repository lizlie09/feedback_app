import React, { useState, useEffect } from "react";
import ProForm, {
  ProFormRadio,
  ProFormRate,
  ProFormTextArea,
  ProFormCheckbox,
} from "@ant-design/pro-form";
import { Tabs, Tag, Radio, Card, Col, Row, message } from "antd";
import { rate, report } from "@/services/rate";
import { history } from "umi";
import { useLocation } from "react-router-dom";
import { getOffices } from "../../services/office";
import { PageContainer } from "@ant-design/pro-layout";
import { SmileOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

export default () => {
  const location = useLocation();
  let { fullname, raterType } = location.state;
  let [offices, setOffices] = useState([]);

  useEffect(() => {
    const fetchOffices = async () => {
      let res = await getOffices();
      if (res.success) {
        setOffices(res.offices);
      } else {
        message.error("Failed to fetch offices");
      }
    };
    fetchOffices();
  }, []);

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
            options={offices?.map((data) => data.name)}
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
                label="Accuracy"
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
                label="Professionalism"
              />
              <ProFormRate
                rules={[
                  {
                    required: true,
                  },
                ]}
                name="star4"
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
                name="star5"
                label="Health Protocol"
              />
              <ProFormRate
                rules={[
                  {
                    required: true,
                  },
                ]}
                name="star6"
                label="Timeliness"
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
                label="Service Efficiency"
              />
              <ProFormRate
                rules={[
                  {
                    required: true,
                  },
                ]}
                name="star8"
                label="Fairness"
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
                label="Overall Services"
              />
              <ProFormRate
                rules={[
                  {
                    required: true,
                  },
                ]}
                name="star10"
                label="Responsiveness"
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
            options={offices?.map((data) => data.name)}
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
    <PageContainer
      avatar={<SmileOutlined color="black" />}
      title={<strong>Hello, {fullname}</strong>}
      subTitle={`(${raterType})`}
    >
      <Row gutter={20} align="middle">
        <Col span={8}>
          <img
            src={"../assets/images/rate1.svg"}
            style={{
              height: "70%",
              alignSelf: "center",
            }}
          />
        </Col>
        <Col span={16}>
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
        </Col>
      </Row>
    </PageContainer>
  );
};

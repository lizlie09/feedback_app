import React, { useState } from "react";
import ProForm, { ProFormRate } from "@ant-design/pro-form";
import { Col, Row } from "antd";
import { Modal } from "antd";

export default ({ state, setState, comment }) => {
  console.log(comment.rate_one);
  return (
    <Modal
      title={`${comment.establishment} | ${comment.fullname}`}
      centered
      visible={state}
      onCancel={() => setState(false)}
      footer={false}
      width={1000}
    >
      <ProForm
        submitter={{
          render: (props, doms) => {
            return <></>;
          },
        }}
        initialValues={{
          star1: comment.rate_one || 0,
          star2: comment.rate_two || 0,
          star3: comment.rate_three || 0,
          star4: comment.rate_four || 0,
          star5: comment.rate_five || 0,
          star6: comment.rate_six || 0,
          star7: comment.rate_seven || 0,
          star8: comment.rate_eight || 0,
          star9: comment.rate_nine || 0,
          star10: comment.rate_ten || 0,
        }}
      >
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
              disabled
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
              disabled
            />
            <ProFormRate
              rules={[
                {
                  required: true,
                },
              ]}
              name="star4"
              label="Water System"
              disabled
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
              disabled
            />
            <ProFormRate
              rules={[
                {
                  required: true,
                },
              ]}
              name="star6"
              label="Responsiveness"
              disabled
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
              disabled
            />
            <ProFormRate
              rules={[
                {
                  required: true,
                },
              ]}
              name="star8"
              label="Painted Walls"
              disabled
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
              disabled
            />
            <ProFormRate
              rules={[
                {
                  required: true,
                },
              ]}
              name="star10"
              label="Garbage Bin Labeled"
              disabled
            />
          </Col>
        </Row>
      </ProForm>
    </Modal>
  );
};

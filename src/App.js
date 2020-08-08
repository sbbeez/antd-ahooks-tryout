import React from "react";
import { Button, Col, Form, Input, Row, Table, Select } from "antd";
import { useAntdTable } from "ahooks";

const { Option } = Select;

const getTableData = ({ current, pageSize }, formData) => {
  let query = `page=${current}&size=${pageSize}`;
  Object.entries(formData).forEach(([key, value]) => {
    if (value) {
      query += `&${key}=${value}`;
    }
  });
  return fetch(`https://randomuser.me/api?results=55&${query}`)
    .then(res => res.json())
    .then(res => ({
      total: res.info.results,
      list: res.results
    }));
};

const AppList = props => {
  const { getFieldDecorator } = props.form;
  const { tableProps, search, loading } = useAntdTable(getTableData, {
    defaultPageSize: 5,
    form: props.form
  });
  console.log("loading", loading);
  const { type, changeType, submit, reset } = search;
  const columns = [
    {
      title: "name",
      dataIndex: "name.last"
    },
    {
      title: "email",
      dataIndex: "email"
    },
    {
      title: "phone",
      dataIndex: "phone"
    },
    {
      title: "gender",
      dataIndex: "gender"
    }
  ];
  const advanceSearchForm = (
    <div>
      <Form>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="name">
              {getFieldDecorator("name")(<Input placeholder="name" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="email">
              {getFieldDecorator("email")(<Input placeholder="email" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="phone">
              {getFieldDecorator("phone")(<Input placeholder="phone" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Form.Item
            style={{
              display: "flex",
              justifyContent: "flex-end"
            }}
          >
            <Button type="primary" onClick={submit}>
              Search
            </Button>
            <Button
              onClick={reset}
              style={{
                marginLeft: 16
              }}
            >
              Reset
            </Button>
            <Button type="link" onClick={changeType}>
              Simple Search
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
  const searchForm = (
    <div
      style={{
        marginBottom: 16
      }}
    >
      <Form
        style={{
          display: "flex",
          justifyContent: "flex-end"
        }}
      >
        {getFieldDecorator("gender", {
          initialValue: "male"
        })(
          <Select
            style={{
              width: 120,
              marginRight: 16
            }}
            onChange={submit}
          >
            <Option value="">all</Option>
            <Option value="male">male</Option>
            <Option value="female">female</Option>
          </Select>
        )}
        {getFieldDecorator("name")(
          <Input.Search
            placeholder="enter name"
            style={{
              width: 240
            }}
            onSearch={submit}
          />
        )}
        <Button type="link" onClick={changeType}>
          Advanced Search
        </Button>
      </Form>
    </div>
  );
  return (
    <div>
      {type === "simple" ? searchForm : advanceSearchForm}
      <Table columns={columns} rowKey="email" {...tableProps} />
    </div>
  );
};

export default Form.create()(AppList);

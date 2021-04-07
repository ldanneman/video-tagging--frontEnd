import React from "react";
import { Table } from "antd";

const dataSource = [
  {
    key: "1",
    name: "Mike",
    email: "mike@gmial.com",
    company: "the company",
    role: 3,
  },
  {
    key: "2",
    name: "John",
    email: "John@gmial.com",
    company: "the Orginization",
    role: 3,
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Company",
    dataIndex: "company",
    key: "company",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Button Test",
    key: "key",
    dataIndex: "key",
    render: (index, record) => (
      <button onClick={() => console.log(record)}>{"Delete"}</button>
    ),
  },
];

function Table2() {
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default Table2;

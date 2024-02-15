"use client";
import { Table } from "antd";
import React from "react";

function LotteriesTable({ data }: { data: any[] }) {
  const columns = [
    {
      title: "Lottery Name",
      dataIndex: "lotteryName",
      key: "lotteryName",
    },
    {
      title: "Ticket Price",
      dataIndex: "ticketPrice",
      key: "ticketPrice",
    },
    {
      title: "Ticket Number",
      dataIndex: "ticketNumber",
      key: "ticketNumber",
    },
    {
      title: "Drawed On",
      dataIndex: "drawedOn",
      key: "drawedOn",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Prize",
      dataIndex: "prize",
      key: "prize",
    },
  ];

  return <div>
    <Table dataSource={data} columns={columns} />
  </div>;
}

export default LotteriesTable;

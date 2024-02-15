"use client";
import { TicketType } from "@/interfaces";
import { Table } from "antd";
import dayjs from "dayjs";
import React from "react";

function TicketsTable({ tickets }: { tickets: TicketType[] }) {
  const columns = [
    {
      title: "Lottery",
      dataIndex: "lottery",
      render: (text: any, record: TicketType) => record.lottery.name,
      key: "lottery",
    },
    {
      title: "Ticket Number",
      dataIndex: "ticketNumber",
      key: "ticketNumber",
    },
    {
      title: "Ticket Price",
      dataIndex: "ticketPrice",
      key: "ticketPrice",
    },
    {
      title: "Purchase Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: any, record: TicketType) =>
        dayjs(record.createdAt).format("MMM DD, YYYY hh:mm A"),
    },
  ];
  return (
    <div>
      <Table dataSource={tickets} columns={columns} />
    </div>
  );
}

export default TicketsTable;

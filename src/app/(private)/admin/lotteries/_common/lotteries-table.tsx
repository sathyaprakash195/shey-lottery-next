"use client";
import { LotteryType } from "@/interfaces";
import { Button, Table, message } from "antd";
import dayjs from "dayjs";
import React from "react";
import { useRouter } from "next/navigation";
import { DeleteLottery } from "@/server-actions/lotteries";
import SelectWinnersModal from "./select-winners-modal";
import SelectedWinnersModal from "./selected-winners-modal";

function LotteriesTable({ lotteries }: { lotteries: LotteryType[] }) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [showSelectWinnersModal, setShowSelectWinnersModal] =
    React.useState(false);
  const [showSelectedWinnersModal, setShowSelectedWinnersModal] =
    React.useState(false);
  const [selectedLottery, setSelectedLottery] =
    React.useState<LotteryType | null>(null);

  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      const response = await DeleteLottery(id);
      if (response.error) {
        throw new Error(response.error);
      }
      message.success(response.message);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ticket Price",
      dataIndex: "ticketPrice",
      key: "ticketPrice",
      render: (text: any, record: LotteryType) => `$${record.ticketPrice}`,
    },
    {
      title: "Start Date and Time",
      dataIndex: "startDateTime",
      key: "startDateTime",
      render: (text: any, record: LotteryType) =>
        dayjs(record.startDateTime).format("MMM DD, YYYY hh:mm A"),
    },
    {
      title: "End Date and Time",
      dataIndex: "endDateTime",
      key: "endDateTime",
      render: (text: any, record: LotteryType) =>
        dayjs(record.endDateTime).format("MMM DD, YYYY hh:mm A"),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text: any, record: LotteryType) => (
        <div className="flex gap-5">
          <Button size="small" onClick={() => onDelete(record._id)}>
            <i className="ri-delete-bin-line"></i>
          </Button>
          <Button
            size="small"
            onClick={() => router.push(`/admin/lotteries/edit/${record._id}`)}
          >
            <i className="ri-pencil-line"></i>
          </Button>
          {record.winnersDeclared ? (
            <Button
              size="small"
              onClick={() => {
                setSelectedLottery(record);
                setShowSelectedWinnersModal(true);
              }}
            >
              Show Winners
            </Button>
          ) : (
            <Button
              size="small"
              onClick={() => {
                setSelectedLottery(record);
                setShowSelectWinnersModal(true);
              }}
            >
              Select Winners
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={lotteries} columns={columns} loading={loading} />

      {showSelectWinnersModal && selectedLottery && (
        <SelectWinnersModal
          showSelectWinnersModal={showSelectWinnersModal}
          selectedLottery={selectedLottery}
          setShowSelectWinnersModal={setShowSelectWinnersModal}
        />
      )}

      {showSelectedWinnersModal && selectedLottery && (
        <SelectedWinnersModal
          showSelectedWinnersModal={showSelectedWinnersModal}
          selectedLottery={selectedLottery}
          setShowSelectedWinnersModal={setShowSelectedWinnersModal}
        />
      )}
    </div>
  );
}

export default LotteriesTable;

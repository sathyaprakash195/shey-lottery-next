import PageTitle from "@/components/page-title";
import { WinnerType } from "@/interfaces";
import WinnerModel from "@/models/winner-model";
import { GetCurrentUserFormMongoDB } from "@/server-actions/users";
import React from "react";
import LotteriesTable from "./_common/lotteries-table";
import dayjs from "dayjs";

async function Lotteries() {
  const mongoUser = await GetCurrentUserFormMongoDB();
  const lotteriesWonByUser: any = await WinnerModel.find({
    user: mongoUser?.data?._id,
  })
    .populate("lottery")
    .populate("ticket");

  let dataAsPerTableFormat: any = [];

  lotteriesWonByUser.forEach((item: WinnerType) => {
    const prize = item.lottery.prizes[item.position - 1];
    dataAsPerTableFormat.push({
      lotteryName: item.lottery.name,
      ticketPrice: item.ticket.ticketPrice,
      ticketNumber: item.ticket.ticketNumber,
      drawedOn: dayjs(item.createdAt).format("MMMM D, YYYY hh:mm A"),
      position: item.position,
      prize: prize.prizeType === "cash" ? prize.amount : prize.itemName,
    });
  });

  return (
    <div>
      <PageTitle title="Lotteries Won" />
      <LotteriesTable data={dataAsPerTableFormat} />
    </div>
  );
}

export default Lotteries;

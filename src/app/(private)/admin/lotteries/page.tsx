import LinkButton from "@/components/link-button";
import PageTitle from "@/components/page-title";
import LotteryModel from "@/models/lottery-model";
import React from "react";
import LotteriesTable from "./_common/lotteries-table";

async function Lotteries() {
  const response = await LotteryModel.find().sort({ createdAt: -1 });
  const lotteries = JSON.parse(JSON.stringify(response));
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Lotteries" />
        <LinkButton title="Create Lottery" path="/admin/lotteries/create" />
      </div>

      <LotteriesTable lotteries={lotteries} />
    </div>
  );
}

export default Lotteries;

import PageTitle from "@/components/page-title";
import LotteryModel from "@/models/lottery-model";
import React from "react";
import LotteryImages from "../_common/lottery-images";
import LotteryDetails from "../_common/lottery-details";

async function LotteryInfoPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const response = await LotteryModel.findById(params.id);
  const lottery = JSON.parse(JSON.stringify(response));
  return (
    <div>
      <PageTitle title={lottery.name} />
      <div className="grid grid-cols-2 mt-7 gap-7 items-start">
        <LotteryImages lottery={lottery} />
        <LotteryDetails lottery={lottery} />
      </div>
    </div>
  );
}

export default LotteryInfoPage;

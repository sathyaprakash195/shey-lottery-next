import PageTitle from "@/components/page-title";
import React from "react";
import LotteryForm from "../../_common/lottery-form";
import LotteryModel from "@/models/lottery-model";

async function EditLottery({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const response = await LotteryModel.findOne({ _id: params.id });
  const lottery = JSON.parse(JSON.stringify(response));
  return (
    <div>
      <PageTitle title="Edit Lottery" />
      <LotteryForm initialData={lottery} isEdit={true} />
    </div>
  );
}

export default EditLottery;

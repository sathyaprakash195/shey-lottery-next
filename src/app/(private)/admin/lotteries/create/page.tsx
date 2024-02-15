import PageTitle from "@/components/page-title";
import React from "react";
import LotteryForm from "../_common/lottery-form";

function CreateLottery() {
  return (
    <div>
      <PageTitle title="Create Lottery" />
      <LotteryForm />
    </div>
  );
}

export default CreateLottery;

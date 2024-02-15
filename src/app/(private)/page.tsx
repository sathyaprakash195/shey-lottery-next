import LotteryModel from "@/models/lottery-model";
import Lottery from "./_common/lottery";

export default async function Home() {
  const response = await LotteryModel.find().sort({ createdAt: -1 });
  const lotteries = JSON.parse(JSON.stringify(response));
  return (
    <div className="grid grid-cols-3 gap-8">
      {lotteries.map((lottery: any) => (
        <Lottery key={lottery._id} lottery={lottery} />
      ))}
    </div>
  );
}

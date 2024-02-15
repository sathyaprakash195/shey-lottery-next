import { LotteryType } from "@/interfaces";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

function CountdownTimer({ lottery }: { lottery: LotteryType }) {
  const [timeLeft, setTimeLeft] = React.useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const fromTime = dayjs();
      const toTime = dayjs(lottery.endDateTime);

      const durationInTime = dayjs.duration(toTime.diff(fromTime));

      const days = durationInTime.days();
      const hours = durationInTime.hours();
      const minutes = durationInTime.minutes();
      const seconds = durationInTime.seconds();

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="flex flex-col">
      <span className="text-gray-500 text-sm">Time Left</span>
      <span className="text-red-700 font-bold text-xl">{timeLeft}</span>
    </div>
  );
}

export default CountdownTimer;

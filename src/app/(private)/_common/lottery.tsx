'use client';
import { LotteryType } from "@/interfaces";
import dayjs from "dayjs";
import React from "react";
import { useRouter } from "next/navigation";

function Lottery({ lottery }: { lottery: LotteryType }) {
  const router = useRouter();
  const getProperty = (key: string, value: any) => {
    return (
      <div className="flex justify-between text-sm">
        <span>{key}</span>
        <span>{value}</span>
      </div>
    );
  };

  return (
    <div
      className="bg-white  flex flex-col lottery-card cursor-pointer"
      onClick={() => router.push(`/lottery/${lottery._id}`)}
    >
      <img
        src={lottery.media[0]}
        alt={lottery.name}
        className="h-64 border-0 border-b border-gray-300 border-solid"
      />
      <div className="flex flex-col p-5">
        <span className="font-bold text-primary py-3">{lottery.name}</span>
        {getProperty("Ticket Price", `$ ${lottery.ticketPrice}`)}
        {getProperty(
          "Start Date & Time",
          dayjs(lottery.startDateTime).format("MMM DD  YYYY , HH:mm")
        )}
        {getProperty(
          "End Date & Time",
          dayjs(lottery.endDateTime).format("MMM DD YYYY , HH:mm")
        )}
        {getProperty(
          "Draw Date & Time",
          dayjs(lottery.drawDateTime).format("MMM DD YYYY , HH:mm")
        )}
      </div>
    </div>
  );
}

export default Lottery;

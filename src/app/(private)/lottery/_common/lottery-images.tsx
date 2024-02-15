"use client";
import { LotteryType } from "@/interfaces";
import classNames from "classnames";
import React from "react";

function LotteryImages({ lottery }: { lottery: LotteryType }) {
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  return (
    <div className="flex flex-col gap-7">
      <img
        src={lottery.media[selectedImageIndex]}
        alt={lottery.name}
        className="w-full h-[400px] object-cover rounded"
      />

      <div className="flex flex-wrap gap-7">
        {lottery.media.map((image, index) => (
          <div
            className={classNames("p-1 cursor-pointer", {
              "border border-blue-500 border-solid":
                selectedImageIndex === index,
            })}
          >
            <img
              key={index}
              src={image}
              alt={lottery.name}
              className="w-20 h-20 object-cover rounded"
              onClick={() => setSelectedImageIndex(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default LotteryImages;

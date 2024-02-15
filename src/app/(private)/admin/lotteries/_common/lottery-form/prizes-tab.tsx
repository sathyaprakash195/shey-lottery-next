import { LotteryType } from "@/interfaces";
import { Button, Input, Select } from "antd";
import React from "react";

function PrizesTab({
  prizes,
  setPrizes,
}: {
  prizes: LotteryType["prizes"];
  setPrizes: React.Dispatch<React.SetStateAction<LotteryType["prizes"]>>;
}) {
  const onPrizeAdd = () => {
    let newPrizes = [...prizes];
    newPrizes.push({
      position: newPrizes.length + 1,
      prizeType: "cash",
      amount: 0,
      itemName: "",
    });
    setPrizes(newPrizes);
  };

  const onChange = (index: number, key: string, value: any) => {
    let newPrizes: any = [...prizes];
    newPrizes[index][key] = value;
    setPrizes(newPrizes);
  };

  const onPrizeDelete = (index: number) => {
    let newPrizes = [...prizes];
    newPrizes.splice(index, 1);
    setPrizes(newPrizes);
  };

  return (
    <div>
      <div className="flex justify-end">
        <Button onClick={onPrizeAdd}>Add Prize</Button>
      </div>

      <div className="mt-7 flex flex-col">
        {prizes.map((prize, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-3 bg-white shadow-sm p-5 gap-5"
            >
              <div className="flex flex-col">
                <span>Position</span>
                <Input
                  value={prize.position}
                  type="number"
                  onChange={(e) => onChange(index, "position", e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <span>Prize Type</span>
                <Select
                  value={prize.prizeType}
                  onChange={(value) => onChange(index, "prizeType", value)}
                >
                  <Select.Option value="cash">Cash</Select.Option>
                  <Select.Option value="item">Item</Select.Option>
                </Select>
              </div>

              <div className="flex gap-5 items-end">
                {prize.prizeType === "cash" ? (
                  <div className="flex flex-col">
                    <span>Amount</span>
                    <Input
                      value={prize.amount}
                      type="number"
                      onChange={(e) =>
                        onChange(index, "amount", e.target.value)
                      }
                    />
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <span>Item Name</span>
                    <Input
                      value={prize.itemName}
                      onChange={(e) =>
                        onChange(index, "itemName", e.target.value)
                      }
                    />
                  </div>
                )}

                <Button onClick={() => onPrizeDelete(index)}>
                  <i className="ri-delete-bin-line"></i>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PrizesTab;

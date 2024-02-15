import { LotteryType } from "@/interfaces";
import { CreateWinnersForLottery } from "@/server-actions/winners";
import { Modal, message } from "antd";
import React from "react";

function SelectWinnersModal({
  showSelectWinnersModal,
  setShowSelectWinnersModal,
  selectedLottery,
}: {
  showSelectWinnersModal: boolean;
  setShowSelectWinnersModal: (show: boolean) => void;
  selectedLottery: LotteryType;
}) {
  const [loading, setLoading] = React.useState(false);

  const handleSelectWinners = async () => {
    try {
      setLoading(true);
      const response = await CreateWinnersForLottery(selectedLottery._id);
      if (response.error) {
        throw new Error(response.error);
      }
      message.success("Winners have been selected successfully");
      setShowSelectWinnersModal(false);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={showSelectWinnersModal}
      onCancel={() => setShowSelectWinnersModal(false)}
      title={`Select Winners for ${selectedLottery.name} Lottery`}
      centered
      width={600}
      okText="Proceed"
      onOk={handleSelectWinners}
      okButtonProps={{ loading }}
      cancelButtonProps={{ disabled: loading }}
    >
      <h1 className="text-sm text-gray-700 mt-7">Prizes</h1>

      <div className="grid grid-cols-3 mt-3">
        <span>Position</span>
        <span>Prize Type</span>
        <span>Value</span>
      </div>

      <hr />

      <div className="mb-7">
        {selectedLottery.prizes.map((prize, index) => (
          <div className="grid grid-cols-3 mt-2 text-gray-500" key={index}>
            <span>{prize.position}</span>
            <span>{prize.prizeType}</span>
            {prize.prizeType === "cash" ? (
              <span>${prize.amount}</span>
            ) : (
              <span>{prize.itemName} </span>
            )}
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default SelectWinnersModal;

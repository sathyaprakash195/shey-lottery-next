import Spinner from "@/components/spinner";
import { LotteryType, WinnerType } from "@/interfaces";
import { GetWinnersForLottery } from "@/server-actions/winners";
import { Modal, message } from "antd";
import React, { useEffect } from "react";

function SelectedWinnersModal({
  showSelectedWinnersModal,
  setShowSelectedWinnersModal,
  selectedLottery,
}: {
  showSelectedWinnersModal: boolean;
  setShowSelectedWinnersModal: (show: boolean) => void;
  selectedLottery: LotteryType;
}) {
  const [loading, setLoading] = React.useState(false);
  const [winners, setWinners] = React.useState<WinnerType[]>([]);

  const getWinners = async () => {
    try {
      setLoading(true);
      const response = await GetWinnersForLottery(selectedLottery._id);
      if (response.error) {
        throw new Error(response.error);
      }
      console.log(response.data);
      setWinners(response.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWinners();
  }, []);

  return (
    <Modal
      open={showSelectedWinnersModal}
      onCancel={() => setShowSelectedWinnersModal(false)}
      title={`Selected Winners for ${selectedLottery.name} Lottery`}
      centered
      width={600}
    >
      <div className="flex flex-col gap-5 mb-10">
        {winners.map((winner, index) => (
          <div className="bg-gray-200 p-5 rounded text-gray-600 flex flex-col">
            <span className="text-sm font-bold">Position: {winner.position}</span>
            <span className="text-xl font-bold">Winner: {winner.user.name}</span>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default SelectedWinnersModal;

"use server";

import LotteryModel from "@/models/lottery-model";
import TicketModel from "@/models/ticket-model";
import WinnerModel from "@/models/winner-model";
import { revalidatePath } from "next/cache";

const getRandomNumber: any = (max: number, numbersToExclude: any[] = []) => {
  let randomNumber: number = Math.floor(Math.random() * max) + 1;
  if (numbersToExclude.includes(randomNumber)) {
    return getRandomNumber(max, numbersToExclude);
  }
  return randomNumber;
};

export const CreateWinnersForLottery = async (lotteryId: string) => {
  try {
    // get the lottery
    const lottery: any = await LotteryModel.findById(lotteryId);

    // get the tickets for the lottery
    const tickets = await TicketModel.find({ lottery: lotteryId });
    const ticketsCount = tickets.length;

    let winnersTicketNumbers: any = [];
    let winnersObjects = [];

    for (let i = 1; i <= lottery?.prizes?.length; i++) {
      let winnerTicketNumber = getRandomNumber(
        ticketsCount,
        winnersTicketNumbers
      );
      winnersTicketNumbers.push(winnerTicketNumber);

      let winnerTicketObj: any = tickets.find(
        (ticket: any, index: number) =>
          ticket.ticketNumber === winnerTicketNumber
      );
      winnersObjects.push({
        position: i,
        lottery: lotteryId,
        ticketNumber: winnerTicketNumber,
        ticket: winnerTicketObj._id,
        user: winnerTicketObj.user,
      });
    }

    await WinnerModel.insertMany(winnersObjects);
    await LotteryModel.findByIdAndUpdate(lotteryId, { winnersDeclared: true });
    revalidatePath("/admin/lotteries");

    return {
      success: true,
      message: "Winners declared successfully",
    };
  } catch (error: any) {
    return {
      error: error.message,
      success: false,
    };
  }
};

export const GetWinnersForLottery = async (lotteryId: string) => {
  try {
    const winners = await WinnerModel.find({ lottery: lotteryId })
      .populate("ticket")
      .populate("user");
    return {
      success: true,
      data: JSON.parse(JSON.stringify(winners)),
    };
  } catch (error: any) {
    return {
      error: error.message,
      success: false,
    };
  }
};

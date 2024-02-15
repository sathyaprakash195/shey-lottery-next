"use server";
import TicketModel from "@/models/ticket-model";
import { revalidatePath } from "next/cache";

export const CreateNewTicket = async (ticketData: any) => {
  try {
    let existingTicketsCount = await TicketModel.countDocuments({
      lottery: ticketData.lottery,
    });
    ticketData.ticketNumber = existingTicketsCount + 1;
    await TicketModel.create(ticketData);
    revalidatePath("/user/tickets");
    return {
      success: true,
      message: "Ticket created successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

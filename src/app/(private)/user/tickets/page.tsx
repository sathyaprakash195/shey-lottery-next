import PageTitle from "@/components/page-title";
import TicketModel from "@/models/ticket-model";
import { GetCurrentUserFormMongoDB } from "@/server-actions/users";
import React from "react";
import TicketsTable from "./_common/tickets-table";

async function Tickets() {
  const mongoUser = await GetCurrentUserFormMongoDB();
  const ticketsResponse = await TicketModel.find({ user: mongoUser.data._id })
    .populate("lottery")
    .sort({ createdAt: -1 });
  return (
    <div>
      <PageTitle title="My Tickets" />

      <TicketsTable tickets={JSON.parse(JSON.stringify(ticketsResponse))} />
    </div>
  );
}

export default Tickets;

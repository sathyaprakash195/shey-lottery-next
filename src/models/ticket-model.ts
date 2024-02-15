import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    lottery: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "lotteries",
    },
    ticketPrice: {
      type: Number,
      required: true,
    },
    ticketNumber: {
      type: Number,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models["tickets"]) {
  delete mongoose.models["tickets"];
}

const TicketModel = mongoose.model("tickets", ticketSchema);
export default TicketModel;

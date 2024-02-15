import mongoose from "mongoose";

const winnerSchema = new mongoose.Schema(
  {
    lottery: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "lotteries",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tickets",
      required: true,
    },
    ticketNumber: {
      type: Number,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models["winners"]) {
  delete mongoose.models["winners"];
}

const WinnerModel = mongoose.model("winners", winnerSchema);
export default WinnerModel;

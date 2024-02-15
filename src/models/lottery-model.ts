import mongoose from "mongoose";

const lotterySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ticketPrice: {
      type: Number,
      required: true,
    },
    startDateTime: {
      type: String,
      required: true,
    },
    endDateTime: {
      type: String,
      required: true,
    },
    drawDateTime: {
      type: String,
      required: true,
    },
    prizes: {
      type: Array,
      required: true,
    },
    media: {
      type: Array,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    winnersDeclared: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models["lotteries"]) {
  delete mongoose.models["lotteries"];
}

const LotteryModel = mongoose.model("lotteries", lotterySchema);
export default LotteryModel;

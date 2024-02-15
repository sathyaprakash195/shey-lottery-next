"use server";

import LotteryModel from "@/models/lottery-model";
import { revalidatePath } from "next/cache";

export const CreateNewLottery = async (payload: any) => {
  try {
    await LotteryModel.create(payload);
    revalidatePath("/admin/lotteries");
    return {
      success: true,
      message: "Lottery created successfully",
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const UpdateLottery = async (id: any, payload: any) => {
  try {
    await LotteryModel.findByIdAndUpdate(id, payload);
    revalidatePath("/admin/lotteries");
    return {
      success: true,
      message: "Lottery updated successfully",
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const DeleteLottery = async (id: any) => {
  try {
    await LotteryModel.findByIdAndDelete(id);
    revalidatePath("/admin/lotteries");
    return {
      success: true,
      message: "Lottery deleted successfully",
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

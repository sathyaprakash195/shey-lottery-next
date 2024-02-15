"use client";
import { Button, Form, Tabs, message } from "antd";
import React, { useEffect, useState } from "react";
import BasicTab from "./basic-tab";
import PrizesTab from "./prizes-tab";
import MediaTab from "./media-tab";
import { LotteryType } from "@/interfaces";
import { UploadImagesToFirebaseAndReturnURLs } from "@/helpers/uploads";
import { CreateNewLottery, UpdateLottery } from "@/server-actions/lotteries";
import { useRouter } from "next/navigation";

function LotteryForm({
  isEdit = false,
  initialData,
}: {
  isEdit?: boolean;
  initialData?: LotteryType;
}) {
  const [loading, setLoading] = useState(false);
  const [prizes, setPrizes] = useState<LotteryType["prizes"]>(
    initialData?.prizes || []
  );
  const [existingMedia = [], setExistingMedia] = useState<string[]>(
    initialData?.media || []
  );
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      let newMedia = await UploadImagesToFirebaseAndReturnURLs(uploadedFiles);
      let media = [...existingMedia, ...newMedia];
      let finalPayload = {
        ...values,
        media,
        prizes,
        ticketPrice: parseFloat(values.ticketPrice),
      };
      let response: any = null;
      if (!isEdit) {
        response = await CreateNewLottery(finalPayload);
      } else {
        response = await UpdateLottery(initialData?._id, finalPayload);
      }

      if (response.error) {
        throw new Error(response.error);
      }
      message.success(response.message);
      router.push("/admin/lotteries");
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-7">
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={isEdit ? initialData : {}} // Add this line
      >
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Basic" key="1">
            <BasicTab />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Prizes" key="2">
            <PrizesTab prizes={prizes} setPrizes={setPrizes} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Media" key="3">
            <MediaTab
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
              existingMedia={existingMedia}
              setExistingMedia={setExistingMedia}
            />
          </Tabs.TabPane>
        </Tabs>

        <div className="flex justify-end gap-5 my-7">
          <Button
            onClick={() => {
              router.push("/admin/lotteries");
            }}
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default LotteryForm;

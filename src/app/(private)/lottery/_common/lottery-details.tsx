"use client";
import { LotteryType } from "@/interfaces";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import CountdownTimer from "./countdown-timer";
import { Button, message } from "antd";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { GetStripeClientSecret } from "@/server-actions/payments";
import PaymentModal from "./payment-modal";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function LotteryDetails({ lottery }: { lottery: LotteryType }) {
  const [clientSecret, setClientSecret] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const getProperty = (key: string, value: any) => {
    return (
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">{key}</span>
        <span className="text-gray-700 font-semibold">{value}</span>
      </div>
    );
  };

  const getClientSecret = async () => {
    try {
      const response = await GetStripeClientSecret(lottery.ticketPrice);
      if (response.success) {
        setClientSecret(response.data);
        console.log(response.data);
      } else {
        throw new Error(response.error);
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getClientSecret();
  }, []);

  return (
    <div className="bg-white p-5 flex flex-col shadow-sm gap-3">
      {getProperty("Ticket Price", `$ ${lottery.ticketPrice}`)}
      {getProperty(
        "Start Date & Time",
        dayjs(lottery.startDateTime).format("MMM DD  YYYY , HH:mm")
      )}
      {getProperty(
        "End Date & Time",
        dayjs(lottery.endDateTime).format("MMM DD YYYY , HH:mm")
      )}
      {getProperty(
        "Draw Date & Time",
        dayjs(lottery.drawDateTime).format("MMM DD YYYY , HH:mm")
      )}

      <div className="mt-10 flex justify-between items-center">
        <CountdownTimer lottery={lottery} />
        <Button onClick={() => setShowPaymentModal(true)} type="primary">
          Buy Ticket
        </Button>
      </div>

      {showPaymentModal && (
        <Elements
          options={{
            clientSecret: clientSecret,
          }}
          stripe={stripePromise}
        >
          <PaymentModal
            showPaymentModal={showPaymentModal}
            setShowPaymentModal={setShowPaymentModal}
            lottery={lottery}
          />
        </Elements>
      )}
    </div>
  );
}

export default LotteryDetails;

import { LotteryType } from "@/interfaces";
import { Button, Modal, message } from "antd";
import React, { useState } from "react";
import {
  AddressElement,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { CreateNewTicket } from "@/server-actions/tickets";
import usersGlobalStore, { UsersGlobalStoreType } from "@/store/users-store";
import { useRouter } from "next/navigation";

function PaymentModal({
  showPaymentModal,
  setShowPaymentModal,
  lottery,
}: {
  showPaymentModal: boolean;
  setShowPaymentModal: (showPaymentModal: boolean) => void;
  lottery: LotteryType;
}) {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { loggedInUserData }: UsersGlobalStoreType =
    usersGlobalStore() as UsersGlobalStoreType;
  const router = useRouter();
  const onSubmit = async (event: any) => {
    try {
      setLoading(true);
      // We don't want to let default form submission happen here,
      // which would refresh the page.
      event.preventDefault();

      if (!stripe || !elements) {
        // Stripe.js hasn't yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "https://example.com/return",
        },
        redirect: "if_required",
      });

      if (result.error) {
        message.error(result.error.message);
      } else {
        message.success("Payment Successful");
        const ticketResponse = await CreateNewTicket({
          user: loggedInUserData?._id,
          lottery: lottery._id,
          ticketPrice: lottery.ticketPrice,
          paymentId: result.paymentIntent.id,
        });

        if (ticketResponse.success) {
          message.success("Ticket Purchased Successfully");
          setShowPaymentModal(false);
          router.push("/user/tickets");
        } else {
          message.error(ticketResponse.message);
        }
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      centered
      title="Complete Payment for Lottery"
      open={showPaymentModal}
      onCancel={() => setShowPaymentModal(false)}
      footer={null}
    >
      <form onSubmit={onSubmit}>
        <PaymentElement />
        <AddressElement
          options={{
            mode: "shipping",
            allowedCountries: ["US"],
          }}
        />

        <div className="flex justify-end gap-5 mt-7">
          <Button>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Pay
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default PaymentModal;

import React from "react";
import App from "components/App";
import PaymentFailed from "components/PaymentFailed";

export const Basic = () => (
  <App>
    <PaymentFailed
      transactionId="68006e46993d57b42aaa"
      message="錯誤錯誤"
      errorCode="123"
    />
  </App>
);

export default {
  title: "PaymentFailed",
  component: PaymentFailed,
};

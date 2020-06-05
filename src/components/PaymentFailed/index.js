import React from "react";
import PropTypes from "prop-types";

const PaymentFailed = ({ transactionId, message, errorCode }) => {
  const mailtoParams = new URLSearchParams({
    to: "大兜 <tonytonyjan@gmail.com>",
    subject: `TJDict 付款失敗：${errorCode}`,
    body: `交易編號：${transactionId}
錯誤代碼：${errorCode}
訊息：${message}`,
  });
  return (
    <div className="container d-flex flex-column align-items-center">
      <h1 className="display-1 mt-5">付款失敗 (×_×)⌒☆</h1>
      <table className="mt-4 table" style={{ maxWidth: 500 }}>
        <tr>
          <td>交易編號</td>
          <td>{transactionId}</td>
        </tr>
        <tr>
          <td>錯誤代碼</td>
          <td>{errorCode}</td>
        </tr>
        <tr>
          <td>訊息</td>
          <td>{message}</td>
        </tr>
      </table>
      <a className="btn btn-lg btn-primary" href={`mailto:?${mailtoParams}`}>
        聯絡作者
      </a>
    </div>
  );
};

PaymentFailed.propTypes = {
  transactionId: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  errorCode: PropTypes.string.isRequired,
};

export default PaymentFailed;

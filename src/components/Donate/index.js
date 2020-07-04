import React from "react";
import PropTypes from "prop-types";
import avatar from "./avatar.png";
import smileAvatar from "./avatar_smile.png";

const Donate = ({ items, smile, onDonate, reviewUrl }) => (
  <div className="container py-3">
    <h1 className="pb-2 mb-2 border-bottom">贊助</h1>
    <div className="media">
      <div className="d-flex flex-column align-items-center mr-3">
        <img
          className="rounded-circle"
          src={smile ? smileAvatar : avatar}
          width={128}
          alt="大兜"
        />
        {smile && <span className="mt-1">感謝贊助！</span>}
      </div>
      <div className="media-body">
        <h5 className="mt-0">嗨！</h5>
        <p>
          筆者自 2012 開發 TJDict
          至今，雖只能在工作之餘研發，但這些年多少個夜晚仍持續地維護著，最開心的莫過於讓正在使用的你能覺得更加方便、好用。
        </p>
        <p>
          TJDict
          自上架以來一直是免費軟體，若你也覺得它不錯，不妨在下列等級中挑選你心目中覺得
          TJDict 所值的價錢贊助，抑或
          <a href={reviewUrl} target="_blank" rel="noreferrer noopener">
            對 TJDict 評分
          </a>
          ，無論何者對筆者而言都是很珍貴的幫助，萬分感謝 =)
        </p>
      </div>
    </div>
    <table className="table">
      <thead>
        <tr>
          <th scope="col">等級</th>
          <th scope="col">說明</th>
          <th scope="col" colSpan={2}>
            金額
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td scope="row">{item.name}</td>
            <td>{item.description}</td>
            <td>{item.price}</td>
            <td>
              <button
                type="button"
                className="btn btn-success"
                disabled={item.disabled}
                onClick={() => onDonate(item)}
              >
                {item.disabled ? "贊助成功" : "我要贊助"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

Donate.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  reviewUrl: PropTypes.string.isRequired,
  onDonate: PropTypes.func,
  smile: PropTypes.bool,
};

Donate.defaultProps = {
  items: [],
  onDonate: () => {},
};

export default Donate;

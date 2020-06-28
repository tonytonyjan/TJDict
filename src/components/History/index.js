import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const History = ({ records, onRemoveRecord, onClearHistory }) => {
  const handleClickTrash = useCallback(
    ({
      currentTarget: {
        dataset: { recordId },
      },
    }) => onRemoveRecord(recordId),
    []
  );
  return (
    <div className="container py-3">
      <div className="d-flex align-items-baseline">
        <h1 className="flex-grow-1">查詢紀錄</h1>
        <button type="button" className="btn btn-link" onClick={onClearHistory}>
          清除所有紀錄
        </button>
      </div>
      <table className="table">
        <tbody>
          {records.length === 0 ? (
            <tr className="table-active">
              <th scope="row" colSpan={3}>
                沒有資料
              </th>
            </tr>
          ) : (
            records.map((record) => {
              if (record.type === "data")
                return (
                  <tr key={record.id}>
                    <th scope="row">{record.query}</th>
                    <td>{record.time}</td>
                    <td>
                      <FontAwesomeIcon
                        size="lg"
                        className="ml-4 text-secondary dictionaries__action"
                        fixedWidth
                        icon={faTrash}
                        data-record-id={record.id}
                        onClick={handleClickTrash}
                      />
                    </td>
                  </tr>
                );
              if (record.type === "text")
                return (
                  <tr key={record.text} className="table-active">
                    <th scope="row" colSpan={3}>
                      {record.text}
                    </th>
                  </tr>
                );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

History.propTypes = {
  records: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.exact({
        type: PropTypes.oneOf(["data"]),
        id: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        query: PropTypes.string.isRequired,
      }),
      PropTypes.exact({
        type: PropTypes.oneOf(["text"]),
        text: PropTypes.string.isRequired,
      }),
    ])
  ).isRequired,
  onRemoveRecord: PropTypes.func,
  onClickMore: PropTypes.func,
  hasMore: PropTypes.bool,
  onClearHistory: PropTypes.func,
};

History.defaultProps = {
  records: [],
  onRemoveRecord: () => {},
  onClickMore: () => {},
  onClearHistory: () => {},
};

export default History;

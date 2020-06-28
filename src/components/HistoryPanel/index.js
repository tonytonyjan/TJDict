import React, { Fragment, useCallback } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const HistoryPanel = ({ records, onRemoveRecord, onClickMore, hasMore }) => {
  const handleClickTrash = useCallback(
    ({
      currentTarget: {
        dataset: { recordId },
      },
    }) => onRemoveRecord(recordId),
    []
  );
  return (
    <Fragment>
      <h2 className="mt-4 mb-2">查詢紀錄</h2>
      <ul className="list-group">
        {records.map(({ id, query }) => (
          <li
            key={id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {query}
            <FontAwesomeIcon
              size="lg"
              className="ml-4 text-secondary dictionaries__action"
              fixedWidth
              icon={faTrash}
              data-record-id={id}
              onClick={handleClickTrash}
            />
          </li>
        ))}
        <li className="list-group-item">
          {records.length === 0
            ? "目前無資料"
            : hasMore && (
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={onClickMore}
                >
                  查看更多
                </button>
              )}
        </li>
      </ul>
    </Fragment>
  );
};

HistoryPanel.propTypes = {
  records: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      query: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onRemoveRecord: PropTypes.func,
  onClickMore: PropTypes.func,
  hasMore: PropTypes.bool,
};

HistoryPanel.defaultProps = {
  records: [],
  onRemoveRecord: () => {},
  onClickMore: () => {},
};

export default HistoryPanel;

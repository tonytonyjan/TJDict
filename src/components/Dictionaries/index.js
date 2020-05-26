import React, { Fragment, useCallback } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import dictionaries from "dictionaries";
import "./style.css";

const Dictionaries = ({
  dictionaryIds,
  unusedDictionaryIds,
  onAddDictionary,
  onRemoveDictionary,
  onMoveUpDictionary,
}) => {
  const handleClickDictionary = useCallback(
    ({
      currentTarget: {
        dataset: { dictId },
      },
    }) => onAddDictionary(dictId),
    []
  );
  const handleClickArrowUp = useCallback(
    ({
      currentTarget: {
        dataset: { dictId },
      },
    }) => onMoveUpDictionary(dictId),
    []
  );
  const handleClickTrash = useCallback(
    ({
      currentTarget: {
        dataset: { dictId },
      },
    }) => onRemoveDictionary(dictId),
    []
  );

  return (
    <Fragment>
      <ul className="list-group" style={{ maxWidth: 400 }}>
        {dictionaryIds.map((dictId, index) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={dictId}
          >
            <span className="flex-grow-1">{dictId}</span>
            {index !== 0 && (
              <FontAwesomeIcon
                size="lg"
                fixedWidth
                className="dictionaries__action"
                icon={faArrowUp}
                data-dict-id={dictId}
                onClick={handleClickArrowUp}
              />
            )}
            <FontAwesomeIcon
              size="lg"
              className="ml-4 dictionaries__action"
              fixedWidth
              icon={faTrash}
              data-dict-id={dictId}
              onClick={handleClickTrash}
            />
          </li>
        ))}
        <li className="list-group-item d-flex justify-content-between align-items-center">
          <button
            type="button"
            className="btn btn-link text-decoration-none"
            data-toggle="modal"
            data-target="#dictionaries-modal"
          >
            新增字典
          </button>
        </li>
      </ul>
      <div className="modal fade" id="dictionaries-modal" role="dialog">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">字典</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <ul className="list-group">
                {unusedDictionaryIds.map((dictId) => (
                  <li
                    className="list-group-item dictionaries__action"
                    key={dictId}
                    data-dict-id={dictId}
                    data-toggle="modal"
                    data-target="#dictionaries-modal"
                    onClick={handleClickDictionary}
                  >
                    <span className="flex-grow-1">{dictId}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Dictionaries.propTypes = {
  dictionaryIds: PropTypes.arrayOf(PropTypes.oneOf(Object.keys(dictionaries)))
    .isRequired,
  unusedDictionaryIds: PropTypes.arrayOf(
    PropTypes.oneOf(Object.keys(dictionaries))
  ).isRequired,
  onAddDictionary: PropTypes.func,
  onMoveUpDictionary: PropTypes.func,
  onRemoveDictionary: PropTypes.func,
};

Dictionaries.defaultProps = {
  dictionaryIds: [],
  unusedDictionaryIds: [],
  onAddDictionary: () => {},
  onMoveUpDictionary: () => {},
  onRemoveDictionary: () => {},
};

export default Dictionaries;

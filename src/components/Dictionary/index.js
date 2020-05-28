import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const Dictionary = forwardRef(({ title, children }, ref) => (
  <div ref={ref}>
    <h2 className="pb-2 mt-4 mb-2 border-bottom">{title}</h2>
    <div>{children}</div>
  </div>
));

Dictionary.displayName = Dictionary.name;

Dictionary.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Dictionary;

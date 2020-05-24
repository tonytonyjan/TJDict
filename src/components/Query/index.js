import React from "react";
import PropTypes from "prop-types";

const Query = ({ query }) => {
  return <h1>Query: {query}</h1>;
};

Query.propTypes = {
  query: PropTypes.string.isRequired,
};

export default Query;

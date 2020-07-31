import React from "react";
import PropTypes from "prop-types";
import "./style.css";

export const variants = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "s1",
  "s2",
  "s3",
  "s4",
  "s5",
  "b1",
  "b2",
  "b3",
];
const DictionaryTypography = ({ variant, component, ...props }) => {
  const Component = component || "div";
  const className = `dictionary-typography dictionary-typography--${variant}`;
  return <Component className={className} {...props} />;
};

DictionaryTypography.propTypes = {
  variant: PropTypes.oneOf(variants).isRequired,
  component: PropTypes.elementType,
};

export default DictionaryTypography;

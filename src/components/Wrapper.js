import React from "react";
import PropTypes from "prop-types";

const Wrapper = ({ children }) => {
  return <div className="flex-wrapper">{children}</div>;
};

Wrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Wrapper;

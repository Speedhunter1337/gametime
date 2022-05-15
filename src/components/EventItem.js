import PropTypes from "prop-types";
import React from "react";

const EventItem = ({ image, title, subtitle }) => {
  return (
    <div className="event-container">
      <img className="event-icon" src={image} alt={title} />
      <div className="info-container">
        <div className="event-title">{title}</div>
        <div className="event-subtitle">{subtitle}</div>
      </div>
    </div>
  );
};

EventItem.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default EventItem;

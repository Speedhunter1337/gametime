import PropTypes from "prop-types";
import React from "react";
import EventItem from "./EventItem";
import Wrapper from "./Wrapper";

const EventList = ({ results }) => {
  const renderEventItems = (results) => {
    return results.map(({ id, image, title, subtitle }) => (
      <EventItem key={id} image={image} title={title} subtitle={subtitle} />
    ));
  };

  if (!results || results.length === 0) return null;

  return (
    <Wrapper>
      <div className="events-list">{renderEventItems(results)}</div>
    </Wrapper>
  );
};

EventList.propTypes = {
  results: PropTypes.array,
};

export default EventList;

import PropTypes from "prop-types";
import React from "react";
import Wrapper from "./Wrapper";

const Search = ({ term, updateSearchTerm }) => {
  const updateTerm = (event) => {
    updateSearchTerm(event.target.value);
  };

  return (
    <Wrapper>
      <input
        className="search-input"
        type="text"
        onChange={updateTerm}
        placeholder="Search team, artist, or venue..."
        value={term}
      />
    </Wrapper>
  );
};

Search.propTypes = {
  term: PropTypes.string,
  updateSearchTerm: PropTypes.func,
};

export default Search;

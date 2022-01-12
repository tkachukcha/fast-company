import React from 'react';
import TextField from './textField';
import PropTypes from 'prop-types';

const SearchForm = ({ searchStr, onChange }) => {
  return (
    <form>
      <TextField
        label="Search"
        type="text"
        name="search"
        value={searchStr}
        onChange={onChange}
      />
    </form>
  );
};
SearchForm.propTypes = {
  searchStr: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SearchForm;

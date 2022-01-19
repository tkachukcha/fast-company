import React from 'react';
import TextField from './textField';
import PropTypes from 'prop-types';

const SearchForm = ({ searchStr, onChange }) => {
  const handleChange = (target) => {
    onChange(target.value);
  };
  return (
    <form>
      <TextField
        label="Search"
        type="text"
        name="search"
        value={searchStr}
        onChange={handleChange}
      />
    </form>
  );
};
SearchForm.propTypes = {
  searchStr: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SearchForm;

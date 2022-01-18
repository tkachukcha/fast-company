import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const MultiSelectField = ({ options, onChange, name, defaultValue }) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === 'object'
      ? Object.keys(options).map((optionName) => ({
          label: options[optionName].name,
          value: options[optionName]._id
        }))
      : options;
  const handleChange = (value) => {
    onChange({ name, value });
  };
  return (
    <div className="mb-4">
      <Select
        isMulti
        closeMenuOnSelect={false}
        defaultValue={defaultValue}
        options={optionsArray}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChange}
        name={name}
      />
    </div>
  );
};
MultiSelectField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onChange: PropTypes.func,
  name: PropTypes.string,
  defaultValue: PropTypes.array
};

export default MultiSelectField;
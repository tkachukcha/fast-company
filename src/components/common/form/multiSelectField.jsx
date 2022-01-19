import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const MultiSelectField = ({
  label,
  options,
  onChange,
  name,
  defaultValue,
  error
}) => {
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
      <label className="form-label">{label}</label>
      <Select
        isMulti
        closeMenuOnSelect={false}
        defaultValue={defaultValue}
        options={optionsArray}
        className={
          error
            ? 'basic-multi-select form-select is-invalid'
            : 'basic-multi-select'
        }
        classNamePrefix="select"
        onChange={handleChange}
        name={name}
      />
      {error && <div className="text-danger mt-3">{error}</div>}
    </div>
  );
};
MultiSelectField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  defaultValue: PropTypes.array
};

export default MultiSelectField;

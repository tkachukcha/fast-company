import React from 'react';
import PropTypes from 'prop-types';
const SelectField = ({
  options,
  name,
  label,
  value,
  onChange,
  error,
  defaultOption
}) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === 'object'
      ? Object.keys(options).map((optionName) => ({
          name: optionName,
          _id: options[optionName]._id
        }))
      : options;

  return (
    <div className="mb-4">
      <label htmlFor="validationCustom04" className="form-label">
        {label}
      </label>
      <select
        className={error ? 'form-select is-invalid' : 'form-select'}
        id="validationCustom04"
        name={name}
        value={value}
        onChange={onChange}
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {optionsArray &&
          optionsArray.map((option) => (
            <option key={option._id} value={option.value}>
              {option.name}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback mt-3">{error}</div>}
    </div>
  );
};
SelectField.defaultProps = {
  type: 'text'
};
SelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  defaultOption: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  error: PropTypes.string,
  options: PropTypes.array
};

export default SelectField;

import React from 'react';
import PropTypes from 'prop-types';

const RadioField = ({ options, label, name, value, onChange }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>
      {options.map((option) => (
        <div
          key={`${option.name}_${option.value}`}
          className="form-check form-check-inline"
        >
          <input
            className="form-check-input"
            type="radio"
            name={name}
            id={`${option.name}_${option.value}`}
            value={option.value}
            checked={option.value === value}
            onChange={handleChange}
          />
          <label htmlFor={`${option.name}_${option.value}`}>
            {option.name}
          </label>
        </div>
      ))}
    </div>
  );
};

RadioField.propTypes = {
  options: PropTypes.array,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default RadioField;

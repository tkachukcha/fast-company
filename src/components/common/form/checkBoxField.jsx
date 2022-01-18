import React from 'react';
import PropTypes from 'prop-types';

const CheckBoxField = ({ name, value, onChange, children, error }) => {
  const handleChange = () => {
    onChange({ name, value: !value });
  };
  return (
    <div className="mb-4">
      <div className="form-check">
        <input
          className={error ? 'form-check-input is-invalid' : 'form-check-input'}
          type="checkbox"
          value={false}
          id={name}
          onChange={handleChange}
          checked={value}
        />
        <label
          className={error ? 'form-check-label is-invalid' : 'form-check-label'}
          htmlFor={name}
        >
          {children}
        </label>
        {error && <div className="invalid-feedback mt-1">{error}</div>}
      </div>
    </div>
  );
};

CheckBoxField.propTypes = {
  name: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default CheckBoxField;

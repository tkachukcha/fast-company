import React, { useState } from 'react';
import PropTypes from 'prop-types';
const TextArea = ({ label, name, value, onChange, rows, error }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <textarea
        className={error ? 'form-control is-invalid' : 'form-control'}
        id={name}
        name={name}
        value={value}
        rows={rows}
        onChange={handleChange}
      ></textarea>
      {error && <div className="invalid-feedback mt-3">{error}</div>}
    </div>
  );
};
TextArea.defaultProps = {
  rows: '3'
};

TextArea.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  rows: PropTypes.string
};

export default TextArea;

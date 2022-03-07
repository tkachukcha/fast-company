import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextArea from '../common/form/textArea';
import { validator } from '../../utils/validator';

const AddComment = ({ onSubmit }) => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validatorConfig = {
    content: {
      isRequired: { message: 'Message must not be empty' }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit(data);
    setData({});
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>New comment</h2>
      <TextArea
        name="content"
        label="Сообщение"
        value={data.content || ''}
        onChange={handleChange}
        error={errors.content}
      />
      <button
        type="submit"
        // disabled={!isValid}
        className="btn btn-primary float-end"
      >
        Опубликовать
      </button>
    </form>
  );
};
AddComment.propTypes = {
  onSubmit: PropTypes.func
};

export default AddComment;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SelectField from '../common/form/selectField';
import TextArea from '../common/form/textArea';
import { validator } from '../../utils/validator';
import api from '../../api';

const AddComment = ({ users, pageId, onSubmit }) => {
  const [data, setData] = useState({ pageId: pageId, userId: '', content: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validatorConfig = {
    userId: {
      isRequired: { message: 'Choose a user' }
    },
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
    api.comments.add(data).then((data) => {
      setData({ pageId: pageId, userId: '', content: '' });
    });
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>New comment</h2>
      <SelectField
        name="userId"
        value={data.userId}
        onChange={handleChange}
        options={users}
        defaultOption="Выберите..."
        error={errors.userId}
      />
      <TextArea
        name="content"
        label="Сообщение"
        value={data.content}
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
  users: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  pageId: PropTypes.string.isRequired,
  onSubmit: PropTypes.func
};

export default AddComment;

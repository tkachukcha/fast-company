import React, { useEffect, useState } from 'react';
import TextField from '../common/form/textField';
import SelectField from '../common/form/selectField';
import { validator } from '../../utils/validator';
import api from '../../api';

const RegisterForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    professions: ''
  });
  const [errors, setErrors] = useState({});
  const [professions, setProfession] = useState();
  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      setProfession(data);
    });
  }, []);
  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const validatorConfig = {
    email: {
      isRequired: { message: 'Email is required' },
      isEmail: { message: 'Email is not valid' }
    },
    password: {
      isRequired: { message: 'Password is required' },
      hasCapital: { message: 'Password must have at least one capital letter' },
      hasDigit: { message: 'Password must have at least one number' },
      minSymbolNum: {
        message: `Password must be at least 8 symbols long`,
        value: 8
      }
    },
    professions: {
      isRequired: { message: 'Выберите профессию' }
    }
  };
  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
  };

  const isValid = Object.keys(errors).length === 0;
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <SelectField
        label="Профессия"
        name="professions"
        value={data.professions}
        onChange={handleChange}
        options={professions}
        defaultOption="Выберите..."
        error={errors.professions}
      />
      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
import React, { useEffect, useState } from 'react';
import MultiSelectField from '../common/form/multiSelectField';
import TextField from '../common/form/textField';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import CheckBoxField from '../common/form/checkBoxField';
import { validator } from '../../utils/validator';
import api from '../../api';

const RegisterForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    professions: '',
    sex: 'male',
    qualities: [],
    license: false
  });
  const [errors, setErrors] = useState({});
  const [professions, setProfession] = useState();
  const [qualities, setQualities] = useState({});

  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      setProfession(data);
    });
    api.qualities.fetchAll().then((data) => {
      setQualities(data);
    });
  }, []);
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const validatorConfig = {
    email: {
      isRequired: { message: 'Введите электронную почту' },
      isEmail: { message: 'Адрес электронной почты некорректен' }
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
    },
    license: {
      isRequired: {
        message: 'Вы должны согласиться с лицензионным соглашением'
      }
    },
    qualities: {
      isRequired: { message: 'Выберите хотя бы одно качество' }
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
    console.log(data);
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
      <RadioField
        name="sex"
        value={data.sex}
        onChange={handleChange}
        options={[
          { name: 'Мужчина', value: 'male' },
          { name: 'Женщина', value: 'female' },
          { name: 'Другой', value: 'other' }
        ]}
      />
      <MultiSelectField
        label="Выберите качества"
        options={qualities}
        onChange={handleChange}
        name="qualities"
        defaultValue={data.qualities}
        error={errors.qualities}
      />
      <CheckBoxField
        value={data.license}
        name="license"
        onChange={handleChange}
        error={errors.license}
      >
        Я соглашаюсь с <a>лицензионным соглашением</a>
      </CheckBoxField>
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

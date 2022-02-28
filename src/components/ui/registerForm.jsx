import React, { useEffect, useState } from 'react';
import MultiSelectField from '../common/form/multiSelectField';
import TextField from '../common/form/textField';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import CheckBoxField from '../common/form/checkBoxField';
import { validator } from '../../utils/validator';
import { useAuth } from '../../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import { getQualities } from '../../store/qualities';
import { useSelector } from 'react-redux';
import { getProfessions } from '../../store/professions';

const RegisterForm = () => {
  const history = useHistory();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    license: false
  });
  const [errors, setErrors] = useState({});
  const professions = useSelector(getProfessions());
  const qualitiesList = useSelector(getQualities());
  const qualities = qualitiesList.map((q) => ({ label: q.name, value: q._id }));
  const { signUp } = useAuth();
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const validatorConfig = {
    name: {
      isRequired: { message: 'Введите ваше имя' },
      min: { message: `Имя должно быть длиннее 3 символов`, value: 3 }
    },
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const newData = { ...data, qualities: data.qualities.map((q) => q.value) };

    try {
      await signUp(newData);
      console.log(newData);
      history.push('/');
    } catch (error) {
      setErrors(error);
    }
  };

  const isValid = Object.keys(errors).length === 0;
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Имя"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
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
        name="profession"
        value={data.profession}
        onChange={handleChange}
        options={professions}
        defaultOption="Выберите..."
        error={errors.profession}
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

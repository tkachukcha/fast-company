import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import MultiSelectField from '../../common/form/multiSelectField';
import TextField from '../../common/form/textField';
import SelectField from '../../common/form/selectField';
import RadioField from '../../common/form/radioField';
import api from '../../../api';
import { validator } from '../../../utils/validator';

const UserEditPage = ({ user, qualities, professions, onUpdate }) => {
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [isUpdated, setIsUpdated] = useState(false);
  const [newData, setNewData] = useState(user);

  const qualArr = Object.keys(qualities).map((qual) => qualities[qual]);

  const userQualities = Object.keys(newData.qualities).map((qual) => ({
    label: newData.qualities[qual].name,
    value: newData.qualities[qual]._id
  }));

  const handleChange = (target) => {
    if (target.name === 'profession') {
      const profArr = Object.keys(professions).map((prof) => ({
        name: professions[prof].name,
        _id: professions[prof]._id
      }));
      setNewData((prevState) => ({
        ...prevState,
        [target.name]: profArr.find((prof) => prof._id === target.value)
      }));
    } else if (target.name === 'qualities') {
      const newQualities = target.value.map((quality) =>
        qualArr.find((qual) => qual._id === quality.value)
      );
      setNewData((prevState) => ({
        ...prevState,
        [target.name]: newQualities
      }));
    } else {
      setNewData((prevState) => ({
        ...prevState,
        [target.name]: target.value
      }));
    }
  };

  const validatorConfig = {
    name: {
      isRequired: { message: 'Введите имя' }
    },
    email: {
      isRequired: { message: 'Введите электронную почту' },
      isEmail: { message: 'Адрес электронной почты некорректен' }
    },
    professions: {
      isRequired: { message: 'Выберите профессию' }
    },
    qualities: {
      isRequired: { message: 'Выберите хотя бы одно качество' }
    }
  };

  const validate = () => {
    const errors = validator(newData, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    validate();
  }, [newData]);

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    api.users.update(user._id, newData);
    setIsUpdated(true);
    setTimeout(() => {
      history.push(`/users/${user._id}`);
    }, 1000);
    onUpdate();
  };

  const handleGoBack = () => {
    history.push(`/users/${user._id}`);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <form onSubmit={handleSubmit}>
            <>
              {isUpdated ? (
                <>
                  <i className="d-inline-block bi bi-check-lg p-1 text-success"></i>
                  <div className="d-inline-block text-success">
                    Данные обновлены!
                  </div>
                </>
              ) : (
                <>
                  <TextField
                    label="Имя"
                    name="name"
                    defaultValue={newData.name}
                    value={newData.name}
                    onChange={handleChange}
                    error={errors.name}
                  />
                  <TextField
                    label="Email"
                    name="email"
                    value={newData.email}
                    onChange={handleChange}
                    error={errors.email}
                  />
                  <SelectField
                    label="Профессия"
                    name="profession"
                    value={newData.profession._id}
                    onChange={handleChange}
                    options={professions}
                    defaultOption="Выберите..."
                    error={errors.professions}
                  />
                  <RadioField
                    name="sex"
                    value={newData.sex}
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
                    defaultValue={userQualities}
                    error={errors.qualities}
                  />
                  <button
                    type="submit"
                    disabled={!isValid}
                    className="btn btn-primary w-100 mx-auto"
                  >
                    Обновить
                  </button>
                  <a
                    type="button"
                    className="d-block text-center text-primary mx-auto mt-2"
                    onClick={handleGoBack}
                  >
                    Назад
                  </a>
                </>
              )}
            </>
          </form>
        </div>
      </div>
    </div>
  );
};
UserEditPage.propTypes = {
  user: PropTypes.object,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onUpdate: PropTypes.func,
  qualities: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  professions: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default UserEditPage;

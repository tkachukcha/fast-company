import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import MultiSelectField from '../../common/form/multiSelectField';
import TextField from '../../common/form/textField';
import SelectField from '../../common/form/selectField';
import RadioField from '../../common/form/radioField';
import { validator } from '../../../utils/validator';
import { useQualities } from '../../../hooks/useQualities';
import { useProfessions } from '../../../hooks/useProfessions';
import { useUsers } from '../../../hooks/useUsers';
import { useAuth } from '../../../hooks/useAuth';

const UserEditPage = ({ id }) => {
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const { currentUser, updateUser } = useAuth();
  const [newData, setNewData] = useState(currentUser);
  const { qualitiesList } = useQualities();
  const { professions } = useProfessions();
  const qualities = qualitiesList.map((q) => ({ label: q.name, value: q._id }));

  const userQualities = newData.qualities.map((qual) => ({
    label: qualities.find((q) => q.value === qual).label,
    value: qual
  }));

  const handleChange = (target) => {
    if (target.name === 'qualities') {
      const newQualities = target.value.map((quality) => quality.value);
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
    setNewData((prevState) => ({
      ...prevState,
      qualities: prevState.qualities.map((q) => q.value)
    }));
    updateUser(newData);
    handleGoBack();
  };

  const handleGoBack = () => {
    history.push(`/users/${currentUser._id}`);
  };

  return (
    <div className="container mt-5">
      <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          <button className="btn btn-primary fw-bold" onClick={handleGoBack}>
            <i className="bi bi-box-arrow-left"></i> Back
          </button>
        </div>
        <div className="col-md-8 offset-md-3 shadow p-4">
          <form onSubmit={handleSubmit}>
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
          </form>
        </div>
      </div>
    </div>
  );
};
UserEditPage.propTypes = {
  id: PropTypes.string
};

export default UserEditPage;

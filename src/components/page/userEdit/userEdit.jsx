import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MultiSelectField from '../../common/form/multiSelectField';
import TextField from '../../common/form/textField';
import SelectField from '../../common/form/selectField';
import RadioField from '../../common/form/radioField';
import api from '../../../api';
// import { validator } from '../../utils/validator';

const UserEdit = ({ user, qualities, professions }) => {
  const [errors, setErrors] = useState({});
  const [newData, setNewData] = useState(user);

  const qualArr =
    qualities && Object.keys(qualities).map((qual) => qualities[qual]);

  const handleChange = (target) => {
    console.log(target);
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

  const userQualities = Object.keys(newData.qualities).map((qual) => ({
    label: newData.qualities[qual].name,
    value: newData.qualities[qual]._id
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    api.users.update(user._id, newData);
    console.log(newData);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
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
            />
            <button
              type="submit"
              // disabled={!isValid}
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
UserEdit.propTypes = {
  user: PropTypes.object,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  qualities: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  professions: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default UserEdit;

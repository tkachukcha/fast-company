import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../../../api';
import { useHistory, useParams } from 'react-router-dom';
import UserEditPage from '../userEditPage';
import UserCard from '../../ui/userCard';
import Comments from '../../ui/comments';
import QualitiesCard from '../../ui/qualitiesCard';
import MeetingsCard from '../../ui/meetingsCard';
import { useUsers } from '../../../hooks/useUsers';
import { CommentsProvider } from '../../../hooks/useComments';

const UserPage = ({ id, professions, qualities }) => {
  const history = useHistory();
  const { users, getUserById } = useUsers();
  const [isUpdated, setUpdated] = useState(false);
  const user = getUserById(id);
  const edit = useParams().edit;

  // useEffect(() => {
  //   api.users.getById(id).then((data) => {
  //     setUser(data);
  //   });
  // }, [isUpdated]);

  const handleUpdate = () => {
    setUpdated((prevState) => !prevState);
  };

  const handleEdit = () => {
    history.push(`/users/${id}/edit`);
  };

  return (
    <>
      {users ? (
        edit ? (
          <UserEditPage
            user={user}
            onUpdate={handleUpdate}
            qualities={qualities}
            professions={professions}
          />
        ) : (
          <div className="container">
            <div className="row gutters-sm">
              <div className="col-md-4 mb-3">
                <UserCard user={user} onEdit={handleEdit} />
                <QualitiesCard qualities={user.qualities} />
                <MeetingsCard meetingsNum={user.completedMeetings} />
              </div>

              <div className="col-md-8">
                <CommentsProvider>
                  <Comments users={users} id={id} />
                </CommentsProvider>
              </div>
            </div>
          </div>
        )
      ) : (
        <h1 className="p-3">Загрузка...</h1>
      )}
    </>
  );
};
UserPage.propTypes = {
  id: PropTypes.string,
  qualities: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  professions: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default UserPage;

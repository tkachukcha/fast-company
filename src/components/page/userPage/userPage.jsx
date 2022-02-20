import React from 'react';
import PropTypes from 'prop-types';
import UserCard from '../../ui/userCard';
import Comments from '../../ui/comments';
import QualitiesCard from '../../ui/qualitiesCard';
import MeetingsCard from '../../ui/meetingsCard';
import { useUsers } from '../../../hooks/useUsers';
import { CommentsProvider } from '../../../hooks/useComments';

const UserPage = ({ id }) => {
  const { users, getUserById } = useUsers();
  const user = getUserById(id);
  return (
    <>
      {users && user ? (
        <div className="container">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <UserCard user={user} />
              <QualitiesCard qualities={user.qualities} />
              <MeetingsCard meetingsNum={user.completedMeetings} />
            </div>

            <div className="col-md-8">
              <CommentsProvider>
                <Comments />
              </CommentsProvider>
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
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

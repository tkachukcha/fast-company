import React from 'react';
import PropTypes from 'prop-types';
import UserCard from '../../ui/userCard';
import Comments from '../../ui/comments';
import QualitiesCard from '../../ui/qualitiesCard';
import MeetingsCard from '../../ui/meetingsCard';
import { CommentsProvider } from '../../../hooks/useComments';
import { useSelector } from 'react-redux';
import { getUserById } from '../../../store/users';

const UserPage = ({ id }) => {
  const user = useSelector(getUserById(id));
  return (
    <>
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
    </>
  );
};
UserPage.propTypes = {
  id: PropTypes.string,
  qualities: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  professions: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default UserPage;

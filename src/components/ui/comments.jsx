import React, { useEffect } from 'react';
import { orderBy } from 'lodash';
import PropTypes from 'prop-types';
import Card from '../common/card';
import AddComment from './addComment';
import Comment from '../common/comment';
import { useDispatch, useSelector } from 'react-redux';
import {
  addComment,
  removeComment,
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList
} from '../../store/comments';
import { useParams } from 'react-router-dom';
import { getCurrentUserId } from '../../store/users';

const Comments = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCommentsList(userId));
  }, [userId]);
  const isLoading = useSelector(getCommentsLoadingStatus());
  const comments = useSelector(getComments());
  const currentUserId = useSelector(getCurrentUserId());
  const handleDelete = (id) => {
    dispatch(removeComment(id));
  };

  const handleSubmit = (data) => {
    dispatch(addComment(data, userId, currentUserId));
  };

  const sortedComments = orderBy(comments, ['created_at'], ['desc']);
  return (
    <>
      <Card classes="mb-2">
        <AddComment onSubmit={handleSubmit} />
      </Card>
      {!isLoading ? (
        <Card>
          <h2>Comments</h2>
          <hr />
          {sortedComments.length > 0 &&
            sortedComments.map((comment) => (
              <Comment
                key={comment._id}
                id={comment._id}
                content={comment.content}
                userId={comment.userId}
                createdAt={comment.created_at}
                onDelete={handleDelete}
              />
            ))}
        </Card>
      ) : (
        'Loading'
      )}
    </>
  );
};
Comments.propTypes = {
  id: PropTypes.string,
  users: PropTypes.array
};

export default Comments;

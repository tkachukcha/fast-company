import React from 'react';
import { orderBy } from 'lodash';
import PropTypes from 'prop-types';
import Card from '../common/card';
import AddComment from './addComment';
import Comment from '../common/comment';
import { useComments } from '../../hooks/useComments';

const Comments = () => {
  const { comments, createComment, removeComment } = useComments();

  const handleDelete = (id) => {
    removeComment(id);
  };

  const handleSubmit = (data) => {
    createComment(data);
  };

  const sortedComments = orderBy(comments, ['created_at'], ['desc']);
  return (
    <>
      <Card classes="mb-2">
        <AddComment onSubmit={handleSubmit} />
      </Card>
      {comments && (
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
      )}
    </>
  );
};
Comments.propTypes = {
  id: PropTypes.string,
  users: PropTypes.array
};

export default Comments;

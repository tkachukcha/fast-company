import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from '../common/card';
import AddComment from './addComment';
import Comment from '../common/comment';
import api from '../../api';

const Comments = ({ users, id }) => {
  const [commentsUpdated, setCommentsUpdated] = useState(false);
  const [comments, setComments] = useState();

  useEffect(() => {
    api.comments.fetchCommentsForUser(id).then((data) => {
      setComments(data.reverse());
    });
  }, [commentsUpdated]);

  const handleCommentsUpdate = () => {
    setCommentsUpdated((prevState) => !prevState);
  };

  useEffect(() => {
    api.comments.fetchCommentsForUser(id).then((data) => {
      setComments(data.reverse());
    });
  }, []);
  return (
    <>
      <Card classes="mb-2">
        <AddComment users={users} pageId={id} onSubmit={handleCommentsUpdate} />
      </Card>
      {comments && comments.length !== 0 && (
        <Card>
          <h2>Comments</h2>
          <hr />
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              id={comment._id}
              content={comment.content}
              userId={comment.userId}
              createdAt={comment.created_at}
              users={users}
              onDelete={handleCommentsUpdate}
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

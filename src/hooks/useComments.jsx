import React, { useState, useContext, useEffect } from 'react';

import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import commentsService from '../services/comment.service';
import { useSelector } from 'react-redux';
import { getCurrentUserId } from '../store/users';

const CommentsContext = React.createContext();

export const useComments = () => {
  return useContext(CommentsContext);
};

export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const pageId = useParams().userId;
  const currentUserId = useSelector(getCurrentUserId());
  useEffect(() => {
    getComments();
  }, [pageId]);

  async function createComment(data) {
    const comment = {
      ...data,
      pageId: pageId,
      userId: currentUserId,
      created_at: Date.now(),
      _id: nanoid()
    };
    try {
      const { content } = await commentsService.createComment(comment);
      setComments((prevState) => [...prevState, content]);
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function getComments() {
    try {
      const { content } = await commentsService.getComments(pageId);
      setComments(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }

  async function removeComment(id) {
    try {
      const { content } = await commentsService.removeComment(id);
      if (content === null) {
        setComments((prevState) => prevState.filter((c) => c._id !== id));
      }
    } catch (error) {
      errorCatcher(error);
    }
  }

  const errorCatcher = (error) => {
    console.log(error);
    // const { message } = error.response.data;
    setErrors(error);
  };

  return (
    <CommentsContext.Provider
      value={{ comments, createComment, removeComment, getComments, isLoading }}
    >
      {!isLoading ? children : 'Loading...'}
    </CommentsContext.Provider>
  );
};

CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

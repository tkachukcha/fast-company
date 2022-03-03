import { createAction, createSlice, nanoid } from '@reduxjs/toolkit';
import commentsService from '../services/comment.service';

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
    },
    commentsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentAdded: (state, action) => {
      state.entities.push(action.payload);
    },
    commentRemoved: (state, action) => {
      state.entities.filter((e) => e._id !== action.payload._id);
    }
  }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
  commentsRequested,
  commentsReceived,
  commentsRequestFailed,
  commentAdded,
  commentRemoved
} = actions;

const commentAdditionRequested = createAction(
  'comments/commentAdditionRequested'
);
const commentAdditionFailed = createAction('comments/commentAdditionFailed');
const commentRemovalRequested = createAction(
  'comments/commentRemovalRequested'
);
const commentRemovalFailed = createAction('comments/commentRemovalFailed');

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const { content } = await commentsService.getComments(userId);
    dispatch(commentsReceived(content));
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};

export const getComments = () => (state) => state.comments.entities;

export const getCommentsLoadingStatus = () => (state) =>
  state.comments.isLoading;

export const addComment = (data, pageId, userId) => async (dispatch) => {
  dispatch(commentAdditionRequested());
  const comment = {
    ...data,
    pageId,
    userId,
    created_at: Date.now(),
    _id: nanoid()
  };
  try {
    const { content } = await commentsService.createComment(comment);
    dispatch(commentAdded(content));
  } catch (error) {
    dispatch(commentAdditionFailed(error.message));
  }
};

export default commentsReducer;

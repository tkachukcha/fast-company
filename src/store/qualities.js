import { createSlice } from '@reduxjs/toolkit';
import qualitiesService from '../services/qualities.service';
import isOutDated from '../utils/isOutdated';

const qualitiesSlice = createSlice({
  name: 'qualities',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    qualitiesRequested: (state) => {
      state.isLoading = true;
    },
    qualitiesReceived: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    qualitiesRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: qualitiesReducer, actions } = qualitiesSlice;
const { qualitiesRequested, qualitiesReceived, qualitiesRequestFailed } =
  actions;

export const loadQualitiesList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().qualities;
  if (isOutDated(lastFetch)) {
    dispatch(qualitiesRequested());
    try {
      const { content } = await qualitiesService.fetchAll();
      dispatch(qualitiesReceived(content));
    } catch (error) {
      dispatch(qualitiesRequestFailed(error.message));
    }
  }
};

export const getQualities = () => (state) => state.qualities.entities;

export default qualitiesReducer;

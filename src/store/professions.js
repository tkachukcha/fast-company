import { createSlice } from '@reduxjs/toolkit';
import professionsService from '../services/professions.service';
import isOutDated from '../utils/isOutdated';

const professionsSlice = createSlice({
  name: 'professions',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    professionsRequested: (state) => {
      state.isLoading = true;
    },
    professionsReceived: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    professionsRequestFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

const { reducer: professionsReducer, actions } = professionsSlice;
const { professionsReceived, professionsRequested, professionsRequestFailed } =
  actions;

export const loadProfessionsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().professions;
  if (isOutDated(lastFetch)) {
    dispatch(professionsRequested());
    try {
      const { content } = await professionsService.fetchAll();
      dispatch(professionsReceived(content));
    } catch (error) {
      dispatch(professionsRequestFailed(error.message));
    }
  }
};

export const getProfessions = () => (state) => state.professions.entities;

export const getProfessionById = (id) => (state) =>
  state.professions.entities.find((p) => p._id === id);

export default professionsReducer;

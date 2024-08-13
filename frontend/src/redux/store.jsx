// src/redux/store.jsx
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userslice';
import jobReducer from './jobslice'; // Import the jobReducer
import applicantReducer from './applicantslice'

const persistedUser = JSON.parse(localStorage.getItem('user'));
const persistedApplicant = JSON.parse(localStorage.getItem('applicant'));

const store = configureStore({
  reducer: {
    user: userReducer,
    jobs: jobReducer, 
    applicant:applicantReducer,
  },
  preloadedState: {
    user: {
      loading: false,
      user: persistedUser || null,
      error: null,
    },
    applicant: {
      loading: false,
      applicant: persistedApplicant || null,
      error: null,
    },
    jobs: {
      loading: false,
      jobs: [],
      applied:[],
      error: null,
    },
  },
});

export default store;

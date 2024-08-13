import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const loginapplicant = createAsyncThunk(
    'applicant/loginapplicant',
    async(usercredential)=>{
        const request  =  await axios.post('http://localhost:3000/api/users/login',usercredential)
        console.log('API response:', request.data);
        const response = request.data;
        localStorage.setItem("applicant",JSON.stringify(response))
        return response
    }
)

export const signupapplicant = createAsyncThunk(
    'applicant/signupapplicant',
    async(usercredential)=>{
        const request  =  await axios.post('http://localhost:3000/api/users/signup',usercredential)
        console.log('API response:', request.data);
        const response = request.data;
        localStorage.setItem("applicant",JSON.stringify(response))
        return response
    }
)

export const logoutapplicant = createAsyncThunk(
    'applicant/logoutapplicant',
    async () => {
        localStorage.removeItem('applicant');
        return;
    }
);

const applicantslice = createSlice({
    name: "applicant",
    initialState: {
        loading: false,
        applicant: null,
        error: null,
    },
    extraReducers: (builder) => {
        // Handle login actions
        builder
            .addCase(loginapplicant.pending, (state) => {
                console.log('Login pending...');
                state.loading = true;
                state.applicant = null;
                state.error = null;
            })
            .addCase(loginapplicant.fulfilled, (state, action) => {
                console.log('Login successful:', action.payload);
                state.loading = false;
                state.applicant = action.payload;
                state.error = null;
            })
            .addCase(loginapplicant.rejected, (state, action) => {
                console.log('Login failed:', action.error.message);
                state.loading = false;
                state.applicant = null;
                state.error = action.error.message;
            });

        //handle signup action
        builder
            .addCase(signupapplicant.pending, (state) => {
                console.log('Login pending...');
                state.loading = true;
                state.applicant = null;
                state.error = null;
            })
            .addCase(signupapplicant.fulfilled, (state, action) => {
                console.log('Signup successful:', action.payload);
                state.loading = false;
                state.applicant = action.payload;
                state.error = null;
            })
            .addCase(signupapplicant.rejected, (state, action) => {
                console.log('Signup failed:', action.error.message);
                state.loading = false;
                state.applicant = null;
                state.error = action.error.message;
                console.log(action.error.message);
            });
        // Handle logout actions
        builder
            .addCase(logoutapplicant.pending, (state) => {
                console.log('Logout pending...');
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutapplicant.fulfilled, (state) => {
                console.log('Logout successful');
                state.loading = false;
                state.applicant = null;
            })
            .addCase(logoutapplicant.rejected, (state, action) => {
                console.log('Logout failed:', action.error.message);
                state.loading = false;
                state.error = action.error.message;
            });   
    }
});


export default applicantslice.reducer;
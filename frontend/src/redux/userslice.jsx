import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const loginuser = createAsyncThunk(
    'user/loginuser',
    async(usercredential)=>{
        const request  =  await axios.post('http://localhost:3000/api/company/logincomp',usercredential)
        console.log('API response:', request.data);
        const response = request.data;
        localStorage.setItem("user",JSON.stringify(response))
        return response
    }
)

export const signupuser = createAsyncThunk(
    'user/signupuser',
    async(usercredential)=>{
        const request  =  await axios.post('http://localhost:3000/api/company/signupcomp',usercredential)
        console.log('API response:', request.data);
        const response = request.data;
        localStorage.setItem("user",JSON.stringify(response))
        return response
    }
)

export const logoutuser = createAsyncThunk(
    'user/logoutuser',
    async () => {
        localStorage.removeItem('user');
        return;
    }
);

const userslice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        user: null,
        error: null,
    },
    extraReducers: (builder) => {
        // Handle login actions
        builder
            .addCase(loginuser.pending, (state) => {
                console.log('Login pending...');
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(loginuser.fulfilled, (state, action) => {
                console.log('Login successful:', action.payload);
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginuser.rejected, (state, action) => {
                console.log('Login failed:', action.error.message);
                state.loading = false;
                state.user = null;
                if (action.error.message === "Request failed with status code 400") {
                    console.log("Invalid credentials");
                } else {
                    state.error = action.error.message;
                }
            });

        //handle signup action
        builder
            .addCase(signupuser.pending, (state) => {
                console.log('Login pending...');
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(signupuser.fulfilled, (state, action) => {
                console.log('Signup successful:', action.payload);
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(signupuser.rejected, (state, action) => {
                console.log('Signup failed:', action.error.message);
                state.loading = false;
                state.user = null;
                state.error = action.error.message;
                console.log(action.error.message);
            });
    

        // Handle logout actions
        builder
            .addCase(logoutuser.pending, (state) => {
                console.log('Logout pending...');
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutuser.fulfilled, (state) => {
                console.log('Logout successful');
                state.loading = false;
                state.user = null;
            })
            .addCase(logoutuser.rejected, (state, action) => {
                console.log('Logout failed:', action.error.message);
                state.loading = false;
                state.error = action.error.message;
            });   
    }
});


export default userslice.reducer;
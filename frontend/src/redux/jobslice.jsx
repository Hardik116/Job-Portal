import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const postjob = createAsyncThunk(
    'job/postjob',
    async (jobcredential, { rejectWithValue }) => {
        try {
            const request = await axios.post('http://localhost:3000/api/jobs/postjob', jobcredential);
            console.log('API response:', request.data);
            return request.data;
        } catch (error) {
            console.error('API request error:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updatejob = createAsyncThunk(
    'job/updatejob',
    async ({ jobcredential, jobId }, { rejectWithValue }) => {
        try {
            console.log(jobId);
            const request = await axios.patch(`http://localhost:3000/api/jobs/${jobId}`, jobcredential);
            console.log('API response:', request.data);
            return request.data;
        } catch (error) {
            console.error('API request error:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);



export const getjob = createAsyncThunk(
    'job/getjob',
    async (userId, { rejectWithValue }) => {
        try {
            console.log('Requesting jobs for user:', userId);
            const response = await axios.get('http://localhost:3000/api/jobs/getjob', {
                params: { user_id: userId }
            });
            console.log('API response:', response.data);
            return response.data;
        } catch (error) {
            console.error('API request error:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getalljob = createAsyncThunk(
    'job/getalljob',
    async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/jobs/getalljob');
            console.log('API response:', response.data);
            return response.data;
        } catch (error) {
            console.error('API request error:', error.response?.data || error.message);
            return
        }
    }
);

export const appliedjob = createAsyncThunk(
    'job/appliedjob',
    async (usercredential) => {
        console.log("This is user credential:", usercredential);
        const userId = usercredential.userId;
        const request = await axios.get(`http://localhost:3000/api/users/getappliedjobs?userId=${userId}`);
        console.log('API response:', request.data);
        const response = request.data;
        return response;
    }
);

export const getapplications = createAsyncThunk(
    'job/application',
    async (usercredential) => {
        console.log("This is user credential:", usercredential);
        const jobId = usercredential.jobId;
        const request = await axios.get(`http://localhost:3000/api/company/getapplications?jobId=${jobId}`);
        console.log('API response:', request.data);
        const response = request.data;
        return response;
    }
);

export const apply = createAsyncThunk(
    'job/apply',
    async (usercredential, thunkAPI) => {
      try {
        const response = await axios.post('http://localhost:3000/api/users/apply', usercredential);
        console.log('API response:', response.data);  
        const { jobId } = usercredential; 
        return { jobId };
      } catch (error) {
        console.error('Error applying for job:', error);
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
      }
    }
  );

  export const remove = createAsyncThunk(
    'job/remove',
    async (usercredential, thunkAPI) => {
      try {
        const response = await axios.post('http://localhost:3000/api/jobs/remove', usercredential);
        console.log('API response:', response.data);  
        const { jobId } = usercredential; 
        return { jobId };
      } catch (error) {
        console.error('Error removing job:', error);
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
      }
    }
  );

export const getonejob = createAsyncThunk(
    'job/getonejob',
    async (jobId, { rejectWithValue }) => {
        try {
            console.log('Requesting job:', jobId);
            const response = await axios.get(`http://localhost:3000/api/jobs/${jobId}`);
            console.log('API response:', response.data);
            return response.data;
        } catch (error) {
            console.error('API request error:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deletejob = createAsyncThunk(
    'job/deletejob',
    async (jobId, { rejectWithValue }) => {
        try {
            console.log('Deleting job:', jobId);
            const response = await axios.delete(`http://localhost:3000/api/jobs/${jobId}`);
            console.log('API response:', response.data);
            return response.data;
        } catch (error) {
            console.error('API request error:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const jobslice = createSlice({
    name: 'job',
    initialState: {
        jobs: [],
        job: null, 
        loading: false,
        applied:[],
        error: null,
    },
    extraReducers: (builder) => {
        // Handle job posting actions
        builder
            .addCase(postjob.pending, (state) => {
                console.log('posting pending...');
                state.loading = true;
                state.error = null;
            })
            .addCase(postjob.fulfilled, (state, action) => {
                console.log('posting successful:', action.payload);
                state.loading = false;
                state.error = null;
            })
            .addCase(postjob.rejected, (state, action) => {
                console.log('posting failed:', action.error.message);
                state.loading = false;
                state.error = action.error.message;
            });

            builder
            .addCase(updatejob.pending, (state) => {
                console.log('updating pending...');
                state.loading = true;
                state.error = null;
            })
            .addCase(updatejob.fulfilled, (state, action) => {
                console.log('updating successful:', action.payload);
                state.loading = false;
                state.error = null;
            })
            .addCase(updatejob.rejected, (state, action) => {
                console.log('updating failed:', action.error.message);
                state.loading = false;
                state.error = action.error.message;
            });    

        // Handle fetching jobs actions
        builder
            .addCase(getjob.pending, (state) => {
                console.log('fetching pending...');
                state.loading = true;
                state.error = null;
            })
            .addCase(getjob.fulfilled, (state, action) => {
                console.log('fetching successful:', action.payload);
                state.loading = false;
                state.jobs = action.payload; 
            })
            .addCase(getjob.rejected, (state, action) => {
                console.log('fetching failed:', action.error.message);
                state.loading = false;
                state.error = action.error.message;
            });

            builder
            .addCase(getalljob.pending, (state) => {
                console.log('fetching pending...');
                state.loading = true;
                state.error = null;
            })
            .addCase(getalljob.fulfilled, (state, action) => {
                console.log('fetching successful:', action.payload);
                state.loading = false;
                state.jobs = action.payload; 
            })
            .addCase(getalljob.rejected, (state, action) => {
                console.log('fetching failed:', action.error.message);
                state.loading = false;
                state.error = action.error.message;
            }); 

            builder
            .addCase(apply.pending, (state) => {
                console.log('apply pending...');
                state.loading = true;
                state.error = null;
            })
            .addCase(apply.fulfilled, (state, action) => {
                console.log('apply successful:', action.payload);
                state.loading = false;
                state.error = null;
            })
            .addCase(apply.rejected, (state, action) => {
                console.log('apply failed:', action.error.message);
                state.loading = false;
                state.error = action.error.message;
                console.log(action.error.message);
            });  

            builder
            .addCase(remove.pending, (state) => {
                console.log('remove pending...');
                state.loading = true;
                state.error = null;
            })
            .addCase(remove.fulfilled, (state, action) => {
                console.log('remove successful:', action.payload);
                state.loading = false;
                // state.applied = state.jobs.filter(job => job._id !== action.payload._id);
                state.error = null;
            })
            .addCase(remove.rejected, (state, action) => {
                console.log('remove failed:', action.error.message);
                state.loading = false;
                state.error = action.error.message;
                console.log(action.error.message);
            }); 
            
            builder
            .addCase(appliedjob.pending, (state) => {
                console.log('fetching pending...');
                state.loading = true;
                state.error = null;
            })
            .addCase(appliedjob.fulfilled, (state, action) => {
                console.log('fetching successful:', action.payload);
                state.loading = false;
                state.applied = action.payload; 
            })
            .addCase(appliedjob.rejected, (state, action) => {
                console.log('fetching failed:', action.error.message);
                state.loading = false;
                state.error = action.error.message;
            }); 

            builder
            .addCase(getapplications.pending, (state) => {
                console.log('fetching pending...');
                state.loading = true;
                state.error = null;
            })
            .addCase(getapplications.fulfilled, (state, action) => {
                console.log('fetching successful:', action.payload);
                state.loading = false;
                state.applied = action.payload; 
            })
            .addCase(getapplications.rejected, (state, action) => {
                console.log('fetching failed:', action.error.message);
                state.loading = false;
                state.error = action.error.message;
            }); 

        // Handle deleting jobs
        builder
            .addCase(deletejob.pending, (state) => {
                console.log('deleting pending...');
                state.loading = true;
                state.error = null;
            })
            .addCase(deletejob.fulfilled, (state, action) => {
                console.log('deleting successful:', action.payload);
                state.loading = false;
                state.jobs = state.jobs.filter(job => job._id !== action.payload._id);
            })
            .addCase(deletejob.rejected, (state, action) => {
                console.log('deleting failed:', action.error.message);
                state.loading = false;
                state.error = action.error.message;
            });    

        // Handle getting a single job
        builder
            .addCase(getonejob.pending, (state) => {
                console.log('getting job pending...');
                state.loading = true;
                state.error = null;
            })
            .addCase(getonejob.fulfilled, (state, action) => {
                console.log('getting job successful:', action.payload);
                state.loading = false;
                state.job = action.payload; 
            })
            .addCase(getonejob.rejected, (state, action) => {
                console.log('getting job failed:', action.error.message);
                state.loading = false;
                state.error = action.error.message;
            });    
    }
});

export default jobslice.reducer;

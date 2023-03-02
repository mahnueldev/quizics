import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://the-trivia-api.com/api/questions/';

export const getQuestions = createAsyncThunk('files/getTrivia', async () => {
  const { data } = await axios.get(`${url}`);
  console.log(data);
  return data;
});

const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    questions: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getQuestions.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(getQuestions.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.questions = action.payload;
    })
    .addCase(getQuestions.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export default questionsSlice.reducer;

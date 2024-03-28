import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

const USERS_URL = "http://localhost:8000/api";

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
  error: null,
  loading: false,
};

export const fetchUser = createAsyncThunk(
  "users/fetchUsers",
  async (credentials) => {
    const response = await axios.post(`${USERS_URL}/auth/login`, credentials);
    // console.log(response.data);
    return response.data;
  }
);
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (credentials) => {
    const response = await axios.post(`${USERS_URL}/user/profile`, credentials);
    // console.log(response.data);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signoutSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.currentUser = action.payload.data;
        state.error = null;
        state.loading = false;
        localStorage.setItem("user", JSON.stringify(action.payload.data));
      })
      .addCase(fetchUser.rejected, (state, action) => {
        // console.log(action.error.message);
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.currentUser = action.payload.data;
        state.error = null;
        state.loading = false;
        localStorage.setItem("user", JSON.stringify(action.payload.data));
      });

    //   .addCase(fetchUser.fulfilled, (state, action) => {
    //     return action.payload;
    //   });
  },
});

export const { signoutSuccess } = userSlice.actions;

export const selectCurrentUser = (state) => state.user;

export default userSlice.reducer;

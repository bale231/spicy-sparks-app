import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  playlists: [],
  status: "idle",
  error: null,
};

export const fetchPlaylists = createAsyncThunk(
  "playlists/fetchPlaylists",
  async () => {
    const response = await fetch(
      `http://localhost:8080/https://api.deezer.com/chart/0/playlists?limit=30`
    );
    const data = await response.json();
    return data;
  }
);

export const fetchAllSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylists.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPlaylists.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.playlists = action.payload;
      })
      .addCase(fetchPlaylists.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default fetchAllSlice.reducer;

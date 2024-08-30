import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  playlist: [],
  status: "idle",
  error: null,
};

export const fetchSinglePlaylist = createAsyncThunk(
  "song/fetchSongs",
  async (playlistId) => {
    const response = await fetch(
      `http://localhost:8080/https://api.deezer.com/playlist/${playlistId}`
    );
    const data = await response.json();
    return data;
  }
);

export const fetchSingleSlice = createSlice({
  name: "fetchSingle",
  initialState,
  reducers: {
    resetPlaylistStatus: (state) => {
      state.status = "idle";
      state.playlist = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSinglePlaylist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSinglePlaylist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.playlist = action.payload;
      })
      .addCase(fetchSinglePlaylist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetPlaylistStatus } = fetchSingleSlice.actions;
export default fetchSingleSlice.reducer;


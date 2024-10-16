import { createSlice } from "@reduxjs/toolkit";
const VoteSlice = createSlice({
  name: "vote",
  initialState: { data: [], votes: {} },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
    setVotes(state, action) {
      state.votes = {
        ...state.votes,
        [action.payload.id]: action.payload.item,
      };
    },
  },
});

export default VoteSlice;

export const voteAction = VoteSlice.actions;

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userId: null,
        ratings: {}
    },
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        clearUserId: (state, action) => {
            state.userId = null;
        },
        addRating: (state, action) => {
            const { movieId, rating } = action.payload;
            state.ratings[movieId] = rating;
        },
    },
    });

export const { setUserId, clearUserId, addRating } = userSlice.actions;
export default userSlice.reducer;
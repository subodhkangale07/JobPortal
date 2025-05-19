// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        user: null,
    },
    reducers: {
        updateUserProfile: (state, action) => {
            // Ensure skills is always treated as an array
            if (action.payload.profile?.skills) {
                if (typeof action.payload.profile.skills === 'string') {
                    // If it's a string, convert to array
                    try {
                        state.user.profile.skills = JSON.parse(action.payload.profile.skills);
                    } catch {
                        state.user.profile.skills = action.payload.profile.skills
                            .split(',')
                            .map(s => s.trim());
                    }
                } else {
                    // It's already an array
                    state.user.profile.skills = action.payload.profile.skills;
                }
            }
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        setUser: (state, action) => {
            state.user = action.payload;
        },
        
        
    },
});

export const { setLoading, setUser, updateUserProfile, updateApplicationStatus } = authSlice.actions;

export default authSlice.reducer;

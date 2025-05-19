import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name: 'application',
    initialState: {
        applicants: {
            applications: []
        },
        loading: false,
        error: null
    },
    reducers: {
        setAllApplicants: (state, action) => {
            state.applicants = action.payload;
        },
        // Reducer for updating application status
        updateApplicationStatus: (state, action) => {
            const { id, status } = action.payload;
            console.log("Reducer received update for:", id, status);
            
            // Make sure applications array exists
            if (!state.applicants || !state.applicants.applications) {
                console.warn("Applications array not found in state");
                return;
            }
            
            // Log the number of applications and their IDs
            console.log(
                "Applications before update:", 
                state.applicants.applications.length,
                "IDs:", 
                state.applicants.applications.map(app => app._id)
            );
            
            // Find the application to update
            const appIndex = state.applicants.applications.findIndex(app => app._id === id);
            
            if (appIndex === -1) {
                console.warn(`Application with ID ${id} not found in state`);
                return;
            }
            
            console.log(`Found application at index ${appIndex}`);
            
            // Create a new array with the updated application
            const updatedApplications = [...state.applicants.applications];
            updatedApplications[appIndex] = {
                ...updatedApplications[appIndex],
                status: status
            };
            
            // Update the state
            state.applicants.applications = updatedApplications;
            
            console.log("Applications after update:", state.applicants.applications.length);
        }
    }
});

export const { setAllApplicants, updateApplicationStatus } = applicationSlice.actions;
export default applicationSlice.reducer;
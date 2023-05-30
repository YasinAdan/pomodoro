import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: "",
    email: "",
    auth: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
    reducers: {
        userData: (state, action) => {
            state.id = action.payload.id;
            state.email = action.payload.userEmail;
        },
        setAuth: (state, action) => {
            state.auth = action.payload;
        },
        logout: (state) => {
            state.auth = false;
            localStorage.removeItem("token");
        }
    }
  },
);

export const { userData, logout, setAuth } = userSlice.actions;
export default userSlice.reducer; 

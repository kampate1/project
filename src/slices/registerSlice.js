import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./userSlice";

const initialState = {
    token: "",
    status: "idle",
    error: null
}

export const registerAccount = createAsyncThunk('register/enter', async (credentials) => {
    const response = await fetch('https://reqres.in/api/register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })

    return response.json();
})

export const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        confirmLogout: (state, action) => {
            state.error = "";
            state.status = "";
            state.token = "";
            return state;
        }
    },

    extraReducers(builder) {
        builder.addCase(registerAccount.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(registerAccount.fulfilled, (state, action) => {
            state.token = action.payload.token
            state.status = 'succeeded'
        })
        builder.addCase(registerAccount.rejected, (state, action) => {
            state.error = action.error.message
            state.status = 'failed'
            alert(state.error)
        })
    }
})

export const { confirmLogout } = registerSlice.actions;

export default registerSlice.reducer
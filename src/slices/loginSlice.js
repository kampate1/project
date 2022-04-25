import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./userSlice";

const initialState = {
    token: "",
    status: "idle",
    error: null
}


export const loginToAccount = createAsyncThunk('login/enter', async (credentials) => {
    const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })

    
    return response.json();
})


export const loginSlice = createSlice({
    name: "login",
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
        builder.addCase(loginToAccount.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(loginToAccount.fulfilled, (state, action) => {
            // in our case payload is {token: "token"}
            state.token = action.payload.token
            state.status = 'succeeded'
        })
        builder.addCase(loginToAccount.rejected, (state, action) => {
            state.error = action.error.message
            state.status = 'failed'
            alert(state.error)
        })
    }
})

export const { confirmLogout } = loginSlice.actions;

export default loginSlice.reducer
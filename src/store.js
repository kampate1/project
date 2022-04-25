import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import loginReducer from './slices/loginSlice'


export const store = configureStore({
    reducer: {
        users: userReducer,
        login: loginReducer
    }
})
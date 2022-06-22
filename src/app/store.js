import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import dataReducer from '../features/dataSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        data: dataReducer
    }
})

export default store
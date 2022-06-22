import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    onError: '',
    isAuthenticated: false,
    user: {}
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: { value: initialState },
    reducers: {
        setOnError: (state, action) => {
            state.value.onError = action.payload
        },

        setCurrentUser: (state, action) => {
            state.value.isAuthenticated = true
            state.value.user = action.payload
        }
    }
})

export const { setCurrentUser, setOnError } = authSlice.actions

export default authSlice.reducer
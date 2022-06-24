import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    modalMessage: '',
    isAuthenticated: false,
    user: {}
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: { value: initialState },
    reducers: {
        setModalMessage: (state, action) => {
            state.value.modalMessage = action.payload
        },

        setCurrentUser: (state, action) => {
            state.value.isAuthenticated = true
            state.value.user = action.payload
        }
    }
})

export const { setCurrentUser, setModalMessage } = authSlice.actions

export default authSlice.reducer
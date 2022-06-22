import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    isSaved: false,
    isDeleted: false,
    isEditButtonClicked: false,
    addedTask: {}
}

export const dataSlice = createSlice({
    name: 'data',
    initialState: { value: initialState },
    reducers: {
        setIsLoading: (state) => {
            state.value.isLoading = true
        },
        
        setIsDeleted: (state, action) => {
            state.value.isDeleted = action.payload
        },
        
        setIsSaved: (state, action) => {
            state.value.isSaved = action.payload
        },
        
        setIsEditButtonClicked: (state, action) => {
            state.value.isEditButtonClicked = action.payload
        },

        setTask: (state, action) => {
            state.value.isLoading = false
            state.value.addedTask = action.payload
        }
    }
})

export const { setTask, setIsEditButtonClicked, setIsSaved, setIsDeleted, setIsLoading } = dataSlice.actions

export default dataSlice.reducer
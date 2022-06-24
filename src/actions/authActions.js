import axios from 'axios'
import { setCurrentUser, setModalMessage } from '../features/authSlice'

export const login = (userData, dispatch, navigate) => {
    axios
        .post('https://stage.api.sloovi.com/login', userData)
        .then(data => {
            if (data.data.code === 400) {
                // console.log(data.data.message)
                dispatch(setModalMessage(data.data.message))
                return
            }

            // console.log(data.data.results)
            dispatch(setCurrentUser(data.data.results))
            navigate('/home')

        })
        .catch(err => {
            console.log(err)
            dispatch(setModalMessage(err.toString()))
        })
}
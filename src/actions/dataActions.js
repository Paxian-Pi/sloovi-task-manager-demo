import axios from 'axios'
import { setOnError } from '../features/authSlice'
import { setIsDeleted, setIsSaved, setTask } from '../features/dataSlice'

export const addTask = (taskData, companyId, token, dispatch) => {
    axios
        .post(`https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${companyId}`, taskData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.data.code === 403) {
                dispatch(setOnError(res.data.message))
                return
            }
            // console.log(res.data)
            dispatch(setIsSaved(true))
            dispatch(setTask(res.data.results))
        })
        .catch(err => console.log(err))
}

export const updateTask = (taskData, companyId, taskId, token, dispatch) => {
    axios
        .put(`https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${taskId}?company_id=${companyId}`, taskData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => {

            console.log('updated!')

            dispatch(setIsSaved(true))
            dispatch(setTask(res.data.results))
        })
        .catch(err => console.log(err))
}

export const deleteTask = (companyId, token, dispatch) => {
    axios
        .delete(` https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/<task_id>?company_id=${companyId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            // console.log(res)
            dispatch(setIsDeleted(true))
            // dispatch(setTask(res.results))
        })
        .catch(err => console.log(err))
}
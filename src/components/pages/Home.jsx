import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ModalAction from '../../common/ModalAction'
import TextField from '../../common/TextField'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setIsDeleted, setIsEditButtonClicked, setIsSaved } from '../../features/dataSlice'
import { TOKEN } from '../../app/constants'
import { addTask, deleteTask, updateTask } from '../../actions/dataActions'

const Home = () => {

    const { isSaved, isEditButtonClicked, isDeleted, addedTask } = useSelector(state => state.data.value)
    const { isAuthenticated, user, onError } = useSelector(state => state.auth.value)

    // console.log(addedTask.id)
    // console.log(addedTask.task_msg)
    // console.log(addedTask.inbox_display_date)

    localStorage.setItem(TOKEN, user.token)

    const [taskMessage, setTaskMessage] = useState('')
    const [assignUser, setAssignUser] = useState('')
    const [modalMessage, setModalMessage] = useState('')
    const [isAddTaskClicked, setIsAddTaskClicked] = useState(false)

    const [startDate, setStartDate] = useState(new Date());
    let hour = new Date(startDate).getHours() * 3600
    let minutes = new Date(startDate).getMinutes() * 60


    let month = startDate.getMonth() + 1;
    let day = startDate.getDate();
    month = (month < 10 ? "0" : "") + month;
    day = (day < 10 ? "0" : "") + day;

    const taskDate = startDate.getFullYear() + "-" + month + "-" + day;
    const timeZone = Math.abs(new Date(startDate).getTimezoneOffset() * 60)
    const taskTime = hour + minutes


    const [showModal, setShowModal] = useState(false);

    const hideModal = () => setShowModal(false)

    let modal;

    if (onError !== '') {
        modal = (
            <ModalAction
                show={showModal}
                // title='Error'
                body={onError}
                onHideHandler={hideModal}
                onClickHandler={hideModal}
                buttonText='Close'
            />
        )
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()



    const onAddTaskHandler = () => {
        setIsAddTaskClicked(true)

        if (isDeleted) {
            setTaskMessage('')
            setAssignUser('')

            dispatch(setIsEditButtonClicked(false))
            dispatch(setIsSaved(false))

            return
        }
        dispatch(setIsEditButtonClicked(false))
        dispatch(setIsSaved(false))
    
    }

    const onCancelHandler = () => {

        if (!isDeleted) dispatch(setIsSaved(true))
        setIsAddTaskClicked(false)
        // dispatch(setIsSaved(false))
    }


    const onSaveHandler = () => {
        dispatch(setIsEditButtonClicked(false))

        if (taskMessage === '' || assignUser === '') {
            setIsAddTaskClicked(false)

            return
        }

        setIsAddTaskClicked(false)
        dispatch(setIsSaved(true))
        dispatch(setIsDeleted(false))

        const taskData = {
            assigned_user: user.user_id,
            task_date: taskDate,
            task_time: taskTime,
            is_completed: 1,
            time_zone: timeZone,
            task_msg: taskMessage
        }

        addTask(taskData, user.company_id, user.token, dispatch)
    }

    const onTaskUpdate = () => {
        dispatch(setIsEditButtonClicked(false))

        if (taskMessage === '' || assignUser === '') {
            setIsAddTaskClicked(false)

            return
        }

        console.log('updating...')

        setIsAddTaskClicked(false)
        dispatch(setIsSaved(true))
        dispatch(setIsDeleted(false))
        
        const taskData = {
            assigned_user: user.user_id,
            task_date: taskDate,
            task_time: taskTime,
            is_completed: 1,
            time_zone: timeZone,
            task_msg: taskMessage
        }

        updateTask(taskData, user.company_id, addedTask.id, user.token, dispatch)

    }

    const onDelete = () => {
        deleteTask(user.company_id, user.token, dispatch)
    }

    const onEditClickHandler = () => {
        dispatch(setIsEditButtonClicked(true))
        setIsAddTaskClicked(true)
        dispatch(setIsSaved(false))
    }

    useEffect(() => {
        if (!isAuthenticated) navigate('/')
    }, [])

    useEffect(() => {
        setIsAddTaskClicked(false)
        dispatch(setIsSaved(false))

    }, [isDeleted])

    return (
        <motion.div
            className='bg_logo d-flex align-items-center justify-content-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">

                        {/* Content */}
                        <div className="register">
                            <div className="container">
                                <div className="row">

                                    {/* <div className='col-md-12 mt-5'>
                                        <h4 className="display-4" style={{ color: '#47bb7f' }}>Task Manager</h4>
                                    </div> */}

                                    <div className="col-md-8 m-auto">

                                        <div className="card mt-5 mb-5 bg_custom" style={{ height: '28rem' }}>

                                            <div className="d-flex bd-highlight" style={{ backgroundColor: '#f9f9fa' }}>

                                                <div className="mr-auto p-2 bd-highlight ml-3 text-dark">
                                                    TASKS
                                                </div>
                                                <button className="input-group-text btn" onClick={onAddTaskHandler}>
                                                    <i className='fa fa-plus'></i>
                                                </button>
                                            </div>


                                            {isSaved &&
                                                <div className="btn bg_custom1 d-flex bd-highlight mt-3 mb-3" style={{ height: '4rem' }}>

                                                    <div className="mr-auto bd-highlight ml-3 mt-1">
                                                        <img src={addedTask.assigned_user_icon} alt='image' className='img' />
                                                    </div>
                                                    <div className='col-md-10'>
                                                        <div className='row'>
                                                            <div className='col-md-3'>
                                                                <h6>{addedTask.task_msg}</h6>
                                                                <h6>{addedTask.task_date}</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span className="mr-5 bd-highligh mt-2" onClick={onEditClickHandler}>
                                                        <i className='fa fa-edit'></i>
                                                    </span>

                                                </div>
                                            }


                                            {isAddTaskClicked &&
                                                <>
                                                    <div className="card-body">
                                                        <p className="card-text d-flex align-items-start">Task Description</p>
                                                        <TextField
                                                            name='task_desc'
                                                            type='text'
                                                            placeholder='Type task here'
                                                            value={taskMessage}
                                                            onChange={(e) => {
                                                                setTaskMessage(e.target.value)
                                                            }}
                                                        />

                                                        <p className="card-text d-flex align-items-start">Date & Time</p>
                                                        <DatePicker
                                                            className='btn d-flex bd-highlight mb-3'
                                                            selected={startDate}
                                                            onChange={(date) => setStartDate(date)}
                                                            showTimeSelect
                                                            timeIntervals={1}
                                                            dateFormat="MMMM d, yyyy  h:mm aa" />

                                                        <p className="card-text d-flex align-items-start">Assign User</p>
                                                        <TextField
                                                            name='user'
                                                            type='text'
                                                            placeholder='Enter a user'
                                                            value={assignUser}
                                                            onChange={(e) => {
                                                                setAssignUser(e.target.value)
                                                            }}
                                                        />

                                                    </div>
                                                    <div className="d-flex bd-highlight mb-3">

                                                        {!isEditButtonClicked
                                                            ? <div className="mr-auto p-2 bd-highlight ml-3 text-dark" />
                                                            : <div className="mr-auto p-2 bd-highlight ml-3 text-dark" onClick={onDelete}>
                                                                <button className="input-group-text btn">
                                                                    <i className='fa fa-trash'></i>
                                                                </button>
                                                            </div>
                                                        }

                                                        <button className="btn btn_custom mr-3 p-2 bd-highlight text-dark" style={{ width: '8rem' }} onClick={onCancelHandler}
                                                        >
                                                            Cancel
                                                        </button>

                                                        <button
                                                            className="btn btn_custom1 mr-3 p-2 bd-highlight text-white"
                                                            style={{ width: '8rem' }}
                                                            onClick={isEditButtonClicked ? onTaskUpdate : onSaveHandler}
                                                        >
                                                            Save
                                                        </button>
                                                    </div>
                                                </>
                                            }





                                        </div>

                                        {modal}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Home
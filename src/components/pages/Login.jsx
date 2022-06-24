import React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import ModalAction from '../../common/ModalAction'
import FloatingLabelTextInput from '../../common/FloatingLabelTextInput'
import { useDispatch } from 'react-redux'
import { login } from '../../actions/authActions'
import { useSelector } from 'react-redux'
import { setModalMessage } from '../../features/authSlice'
import { useNavigate } from 'react-router-dom'


const Login = () => {

    const { modalMessage } = useSelector(state => state.auth.value)

    const [onLogin, setOnLogin] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onLoginHandler = () => {

        setShowModal(true)

        if (email === '' || password === '') {
            dispatch(setModalMessage('Empty field detected!'))
            return
        }

        dispatch(setModalMessage(''))
        setOnLogin(true)

        const userData = {
            email: email,
            password: password
        }

        login(userData, dispatch, navigate)
    }

    const LoginButton = () => {
        return (
            <div>
                {onLogin && modalMessage === ''
                    ?
                    <button className="btn btn-dark bg-transparent btn-block mt-4 mb-5 text-dark">
                        Logging in...
                    </button>
                    :
                    <button className="btn btn_custom1 btn-block mt-4 mb-5 text-white" onClick={onLoginHandler}>
                        Log In
                    </button>
                }
            </div>
        );
    };

    const [showModal, setShowModal] = useState(false);

    const hideModal = () => setShowModal(false)

    let modal;
    
    if (modalMessage !== '') {
        modal = (
            <ModalAction
                show={showModal}
                // title='Error'
                body={modalMessage}
                onHideHandler={hideModal}
                onClickHandler={hideModal}
                buttonText='Close'
            />
        )
    }

    return (
        <motion.div
            className='bg_custom d-flex align-items-center justify-content-center'
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
                                    <div className='col-md-12 mt-5 mb-5'>
                                        <h4 className="display-4" style={{ color: '#47bb7f' }}>Welcome To Sloovi Task Manager</h4>
                                    </div>
                                    <div className="col-md-6 m-auto">

                                        <FloatingLabelTextInput
                                            label='Email'
                                            type='email'
                                            value={email}
                                            onChangeHandler={(e) => setEmail(e.target.value)}
                                        />

                                        <FloatingLabelTextInput
                                            label='Password'
                                            type='password'
                                            value={password}
                                            onChangeHandler={(e) => setPassword(e.target.value)}
                                        />

                                        {modal}

                                        <LoginButton />
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

export default Login
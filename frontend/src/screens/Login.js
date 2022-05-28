import React from 'react'
import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });



    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isError, isLoading, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)

        }

        if (isSuccess || user) {
            navigate('/')
        }
        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch]);


    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        })

        );
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email, password
        }
        dispatch(login(userData))
    }

    const { email, password } = formData;

    if (isLoading) {
        return <Spinner />
    }


    return (

        <>
            <section>
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Please Login your account</p>
            </section>

            <section className='form'>
                <form onSubmit={ onSubmit } >

                    <div className='form-group'>
                        <input
                            type="email"
                            id='email'
                            name='email'
                            className='form-control'
                            placeholder="Enter your email"
                            value={ email }
                            onChange={ onChange }
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type="password"
                            id='password'
                            name='password'
                            className='form-control'
                            placeholder="Enter password"
                            value={ password }
                            onChange={ onChange }
                        />
                    </div>

                    <div className='form-group'>
                        <button type="submit" className='btn btn-block'>
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login
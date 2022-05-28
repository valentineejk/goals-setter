import React from 'react'
import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';


const Register = () => {


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const onChange = (e) => {

        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        })

        );
    }

    const onSubmit = (e) => {
        e.preventDefault();


        if (password !== password2) {
            toast.error('passwords do not match')
        } else {
            const userData = {
                name,
                email,
                password
            }
            dispatch(register(userData))
        }
    }

    const { name, email, password, password2 } = formData;

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

    if (isLoading) {
        return <Spinner />
    }
    return (
        <>
            <section>
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Please create an account</p>
            </section>

            <section className='form'>
                <form onSubmit={ onSubmit } >
                    <div className='form-group'>
                        <input
                            type="text"
                            id='name'
                            name='name'
                            className='form-control'
                            placeholder="Enter your name"
                            value={ name }
                            onChange={ onChange }
                        />
                    </div>
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
                        <input
                            type="password"
                            id='password2'
                            name='password2'
                            className='form-control'
                            placeholder="Confirm password"
                            value={ password2 }
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

export default Register
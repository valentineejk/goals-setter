import React from 'react'
import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa';

const Login = () => {
    const [fromData, setFromData] = useState({
        email: '',
        password: '',
    });

    const onChange = (e) => {
        setFromData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        })

        );
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(fromData);
    }

    const { email, password } = fromData;
    return (
        <>
            <section>
                <h1>
                    <FaSignInAlt /> Register
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
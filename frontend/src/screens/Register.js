import React from 'react'
import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa';

const Register = () => {
    const [fromData, setFromData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
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

    const { name, email, password, password2 } = fromData;
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
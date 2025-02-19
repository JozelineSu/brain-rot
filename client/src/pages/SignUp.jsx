import '../styles/Login.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const SignUp = () => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [addUser, { error, data }] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        try {
            const { data } = await addUser({
                variables: { ...formState },
            });

            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <main className="login">
            <h1 className='title'>BrainRot</h1> 
            
            <div className='container'>
                <h2>Sign Up</h2>
                {data ? (
                    <p>
                        You're logged in! You may now head{' '}
                        <Link to="/">back to homepage</Link>
                    </p>
                ) : (
                    <form onSubmit={handleFormSubmit}>
                        <div>
                            <label>Username:</label>
                            <input
                                className="form-input"
                                name="username"
                                type="text"
                                value={formState.name}
                                onChange={handleChange}
                            />   
                        </div>
                        <div>
                            <label>Email:</label>
                            <input
                                className="form-input"
                                name="email"
                                type="email"
                                value={formState.email}
                                onChange={handleChange}
                            />    
                        </div>
                        <div>
                            <label>Password:</label>
                            <input
                                className="form-input"
                                name="password"
                                type="password"
                                value={formState.password}
                                onChange={handleChange}
                            />   
                        </div>
                        <div className='btn-container' 
>
                            <button
                                type='submit'
                                className='loginbtn'
                            >
                                Sign Up
                            </button>    
                        </div>
                        
                </form>
                )}  

                {error && (
                    <div>
                        {error.message}
                    </div>
                )}           
            </div>  
        </main>
    );
};

export default SignUp;
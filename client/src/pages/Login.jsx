import '../styles/Login.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
    const [formState, setFormState] = useState({ email: '', password: ''});
    const [login, { error, data }] = useMutation(LOGIN_USER);

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
            const { data } = await login({
                variables: { ...formState },
            });

            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }

        //clear form values
        setFormState({
            email: '',
            password: '',
        });
    };

    return (
        <main className="login">
            <div>{/*action is location URL data is sent method is HTTP method to send data usually GET or POST */}
                <h1 className='title'>BrainRot</h1> 
                
                <div className='container'>
                    <h2>Login</h2>
                    {data ? (
                        <p>
                            You're logged in! You may now head{' '}
                            <Link to="/">back to homepage</Link>
                        </p>
                    ) : (
                        <form onSubmit={handleFormSubmit}>
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
                            <div className='btn-container'>
                                <button
                                    className='loginbtn' 
                                    type='submit'
                                >
                                    Login
                                </button>
                                <Link to="/signup">
                                    <button className='signupbtn'>Sign Up</button>
                                </Link>   
                            </div>
                            
                        </form>
                    )}

                    {error && (
                        <div className='error'>
                            {error.message}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Login;
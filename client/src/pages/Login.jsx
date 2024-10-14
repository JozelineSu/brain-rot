import '../styles/Login.css';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div className="login">
            <form action="" method="">{/*action is location URL data is sent method is HTTP method to send data usually GET or POST */}
                <h1 className='title'>BrainRot</h1> 
                <h2>Login</h2>
                <ul>
                    <li>
                        <label for ="mail">Email:</label>
                        <input type="email" id="mail" name="user_email"/>
                    </li>
                    <li>
                        <label for="password">Password:</label>
                        <input type="password" id="password" name="password"/>
                    </li>
                    
                    <button className='loginbtn' type="submit">Login</button>

                    <Link to="/signup">
                        <button className='signupbtn'>Sign Up</button>
                    </Link>
                    
                </ul>
            </form>
        </div>
    )
}

export default Login;
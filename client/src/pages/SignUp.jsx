import '../styles/Login.css';

function SignUp() {
    return (
        <div className="login">
            <form action="" method="">{/*action is location URL data is sent method is HTTP method to send data usually GET or POST */}
                <h1 className='title'>BrainRot</h1> 
                <h2>Sign Up</h2>
                <ul>
                    <li>
                        <label for ="mail">Email:</label>
                        <input type="email" id="mail" name="user_email"/>
                    </li>
                    <li>
                        <label for="password">Password:</label>
                        <input type="password" id="password" name="password"/>
                    </li>
                    <li>
                        <label for="password">Confirm Password:</label>
                        <input type="password" id="password" name="password"/>
                    </li>
                    
                    <button className='loginbtn' type="submit">Sign Up</button>
                    
                </ul>
            </form>
        </div>
    )
}

export default SignUp;
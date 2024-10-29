import { loginWithGoogle } from '../appwrite/authappwrite.js'
import './Login.css'
const Login = () => {
    return (
        <div class='main-div'>
            <div class="container">
                <div class="intro">
                    <h1>Welcome to Your Mood Journal</h1>

                    <p>This app allows you to track your moods over time, helping you understand your emotions better. Journal your feelings daily, see patterns, and reflect on your mental well-being.</p>
                </div>
                <div class="login">
                    {/* <button class="login-button">Login with Google</button>
                    <p class="message">You will login automatically if you have already registered</p> */}
                    <button className="button" onClick={loginWithGoogle}>
                        <span className="icon-google"></span>
                        <span className="text">Login with Google</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login
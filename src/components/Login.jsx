import { loginWithGoogle } from '../appwrite/authappwrite.js'

const Login = () => {
    return (
        <button onClick={loginWithGoogle}>Login with Google</button>
    )
}

export default Login
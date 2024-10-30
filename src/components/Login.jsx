import { loginWithGoogle } from '../appwrite/authappwrite.js'
import './styles/Login.css'
const Login = () => {
    return (
        <div className='box login-page-div u-flex u-main-center u-cross-center u-column-gap-80 u-margin-block-32 u-margin-inline-128 u-padding-96'>
            <div className="u-flex u-flex-vertical u-main-center u-cross-center u-row-gap-48 u-margin-inline-64">
                <h2 className="heading-level-2">Your Daily Mood Journal</h2>
                <p className="body-text-1 u-max-width-400">Discover a space where you can express your emotions, reflect on your day, and cultivate mindfulness</p>

                <ul className="list">
                    <li className="list-item">
                        <span className="icon-pencil" aria-hidden="true"></span>
                        <span className="text">Mood Tracking</span>
                    </li>
                    <li className="list-item">
                        <span className="icon-clipboard-list" aria-hidden="true"></span>
                        <span className="text">Daily Journals</span>
                    </li>
                    <li className="list-item">
                        <span className="icon-clock" aria-hidden="true"></span>
                        <span className="text">Recap of emotions</span>
                    </li>
                </ul>
                <p className='u-flex u-column-gap-32'>
                    <span className="icon-cheveron-left"></span>
                    <span>Tech Stack </span>

                    <span className="icon-cheveron-right"></span>
                    <span className="icon-react"></span>
                    <span className="icon-github"></span>
                    <span className="icon-google"></span>
                </p>

            </div>

            <div className="u-flex u-flex-vertical u-main-center u-cross-center u-row-gap-16 u-margin-inline-64">
                <button className="button is-big login-with-google" onClick={loginWithGoogle}>
                    <span className="icon-google"></span> <span>Sign in with Google</span>
                </button>
                <p className="disclaimer-login-page body-text-2 u-max-width-300">If you've already created an account, sign in with your registered Google account to access your profile.</p>
            </div>
        </div >


    )
}

export default Login
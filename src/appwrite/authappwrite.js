// src/auth.js
import { account, OAuthProvider } from './config'

export const loginWithGoogle = async () => {
    try {
        await account.createOAuth2Session(
            OAuthProvider.Google,
            'http://localhost:5173/',
            'http://localhost:5173/fail')
    } catch (error) {
        console.error(error)
    }
}

export const logoutUser = async () => {
    try {
        await account.deleteSession('current')
        sessionStorage.removeItem('user');
    } catch (error) {
        console.error(error)
    }
}

export const getUser = async () => {
    try {
        return await account.get()
    } catch (error) {
        console.error(error)
    }
}


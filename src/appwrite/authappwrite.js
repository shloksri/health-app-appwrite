// src/auth.js
import { account, OAuthProvider } from './config'

export const loginWithGoogle = async () => {
    try {
        await account.createOAuth2Session(
            OAuthProvider.Google,
            'https://health-app-appwrite.vercel.app/',
            'https://health-app-appwrite.vercel.app/fail')
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


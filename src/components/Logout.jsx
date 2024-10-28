import { useState } from 'react';
import { logoutUser } from '../appwrite/authappwrite.js'
import { useUser } from "../context/UserContext.jsx";


const Logout = () => {

    const { user, setUser } = useUser();
    // const [user, setUser] = useState("UserTest1")
    const handleLogout = async () => {
        await logoutUser();
        setUser(null);
    }

    return (
        <div>
            {
                user ? <>
                    <p>Welcome, {user.name}!</p>
                    <p>Email: {user.email}</p>
                    <br />
                    <button onClick={handleLogout}>Logout</button>
                </> : "Not logged in"
            }
            {/* <p>Welcome, {user.name}!</p>
            <button onClick={handleLogout}>Logout</button> */}
        </div>
    )
}

export default Logout
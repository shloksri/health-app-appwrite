// src/Auth.js
import React, { useState, useEffect } from 'react'
import { useUser } from "../context/UserContext.jsx";
import Login from './Login.jsx'
import Logout from './Logout.jsx'

const MainApp2 = () => {
    // const [user, setUser] = useState(null)
    const { user, setUser } = useUser()

    return (
        <div>
            {user ? <Logout user={{ user, setUser }} /> : <Login />}
        </div>
    )
}

export default MainApp2


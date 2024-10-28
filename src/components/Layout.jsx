// Layout.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// import Logout from './Logout.jsx'
// import { useUser } from "../context/UserContext.jsx";


const Layout = ({ children }) => {
    const location = useLocation();
    // const { user, setUser } = useUser()

    return (
        <div>
            {location.pathname !== '/' && (
                <Link to="/">Back to Home</Link>
            )}
            {/* <br />
            <Link to="/" elemen>
                <Logout user={{ user, setUser }} />
            </Link> */}
            {/* <Link></Link> */}
            <main>{children}</main>
        </div>
    );
};

export default Layout;

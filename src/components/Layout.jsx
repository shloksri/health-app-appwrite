// Layout.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';


const Layout = ({ children }) => {
    const location = useLocation();

    return (
        <div>
            {location.pathname !== '/' && (
                <>
                    <div className='box login-page-div u-margin-inline-64'>
                        <header className="grid-header">
                            <div className="grid-header-col-1 heading-level-6 u-cross-child-center">
                                <Link to="/">
                                    <button
                                        className="button is-secondary is-only-icon"
                                        aria-label="Add new item"
                                    >
                                        <span className="icon-home" aria-hidden="true"></span>
                                    </button>
                                </Link>
                            </div>
                        </header>
                    </div>
                </>

            )}
            <main>{children}</main>
        </div>

    );
};

export default Layout;

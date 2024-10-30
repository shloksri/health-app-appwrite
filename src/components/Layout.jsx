// Layout.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';


const Layout = ({ children }) => {
    const location = useLocation();

    return (
        <div>
            {/* 
            
            login-page-div u-flex-vertical u-flex u-main-center u-cross-center u-column-gap-80 u-margin-block-32 u-margin-inline-128 u-padding-96
            */}
            {location.pathname !== '/' && (
                <>
                    {/* <Link to="/">Back to Home</Link> */}

                    <div className='box login-page-div u-margin-inline-64'>
                        <header class="grid-header">
                            <div class="grid-header-col-1 heading-level-6 u-cross-child-center">
                                <Link to="/">
                                    <button
                                        class="button is-secondary is-only-icon"
                                        aria-label="Add new item"
                                    >
                                        <span class="icon-home" aria-hidden="true"></span>
                                    </button>
                                </Link>
                            </div>
                        </header>
                    </div>
                </>

            )}
            {/* <div class="box u-flex u-flex-vertical u-main-center u-cross-center u-row-gap-48 u-margin-inline-64">
               

            </div> */}
            <main>{children}</main>
        </div>

    );
};

export default Layout;

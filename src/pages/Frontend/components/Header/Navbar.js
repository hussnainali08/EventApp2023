import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../../../config/firebase';
import { Link } from 'react-router-dom';
import Logo from '../../../../assets/images/logo.png';

export default function Navbar() {

    const [stickyClass, setStickyClass] = useState('relative');

    useEffect(() => {
        window.addEventListener('scroll', stickNavbar);

        return () => {
            window.removeEventListener('scroll', stickNavbar);
        };
    }, []);

    const stickNavbar = () => {
        if (window !== undefined) {
            let windowHeight = window.scrollY;
            windowHeight > 200 ? setStickyClass('fixed top-0 left-0 z-50') : setStickyClass('relative');
        }
    };



    const { isAuthenticated, dispatch } = useContext(AuthContext)
    const navigate = useNavigate()
    console.log(isAuthenticated)

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                dispatch({ type: "LOGOUT" })
                navigate('/authentication/login')
            })
            .catch((err) => {
                console.error(err);
            })

    }

    return (
        <>
            <div className={`h-16 w-full bg-gray-200 ${stickyClass}`}>

                <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                    <div className="container py-2">
                        <Link to="/home" className="navbar-brand" ><img className='logo' src={Logo} alt="" /></Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <div className='ms-auto'>
                                <Link to="/events" className="btn btn-sm btn-info me-1" >Events</Link>
                                <Link to="/authentication/register" className="btn btn-sm btn-info me-1" >Register</Link>
                                <Link to="/authentication/login" className="btn btn-sm btn-info me-1" >Login</Link>
                                <Link to="/authentication/login" className="btn btn-sm btn-danger" onClick={handleLogout} >LogOut</Link>

                            </div>

                        </div>
                    </div>
                </nav>

            </div>


        </>
    )
}

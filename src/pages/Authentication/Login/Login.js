import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../../config/firebase";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

const initialState = { email: "", password: "" }

console.log(initialState)
export default function Login() {

    const { dispatch } = useContext(AuthContext)

    const navigate = useNavigate();
    const [state, setState] = useState({ initialState });
    const [isProcessing, setIsProcessing] = useState(false);

    const handleChange = (e) => {
        setState(s => ({ ...s, [e.target.name]: e.target.value }))
    }

    const handleLogin = (e) => {
        e.preventDefault()
        let { email, password } = state

        setIsProcessing(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                let user = userCredential.user
                console.log(user);
                dispatch({ type: "LOGIN", payload: { user } })
                navigate("/home")
            })
            .catch(err => {
                console.error(err)
            })
            .finally(() => {
                setIsProcessing(false)

            })

    }

    return (
        <>
            <div className='auth'>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                            <div className='card py-2 p-md-3 p-lg-4'>
                                <div className='form' onClick={handleLogin}>
                                    <div className="row">
                                        <div className="col">
                                            <h2 className='text-center'>Login</h2>

                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" name='email' className='form-control' placeholder='Email' onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" name='password' className='form-control' placeholder='Password' onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col text-center">
                                            <button className='btn btn-primary w-50  p-1' disabled={isProcessing}>{!isProcessing ? "Login" :
                                                <div className='spinner-grow spinner-grow-sm'></div>

                                            }</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col text-center"><p>Need an account <Link to="/authentication/Register">Register</Link></p></div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

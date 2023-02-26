
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore/lite';
import { auth, firestore } from "../../../config/firebase";

const initialState = { email: "", password: "" }

console.log(initialState);
export default function Register() {

    const navigate = useNavigate()
    const { dispatch } = useContext(AuthContext)

    const [state, setState] = useState({ initialState });
    const [isProcessing, setIsProcessing] = useState(false);

    const handleChange = (e) => {
        setState(s => ({ ...s, [e.target.name]: e.target.value }))
    }

    const handleRegister = (e) => {
        e.preventDefault()
        let { email, password } = state


        setIsProcessing(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                let user = userCredential.user
                addDocument(user)
                console.log(user);
            })
            .catch(err => {
                console.error(err)
                setIsProcessing(false)
            })

    }

    const addDocument = async (user) => {
        try {

            await setDoc(doc(firestore, "user", user.uid), {
                firstName: "",
                lastName: "",
                uid: user.uid,
            });
            console.log("user document create at firestorage");
            dispatch({ type: "LOGIN", payload: { user } });
        }
        catch (err) {
            console.error(err)
        }
        setIsProcessing(false)
        navigate("/home")
    }

    return (
        <>
            <div className='auth'>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                            <div className='card py-2 p-md-3 p-lg-4'>
                                <div className='form' onClick={handleRegister}>
                                    <div className="row">
                                        <div className="col">
                                            <h2 className='text-center'>Register</h2>

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
                                            <button className='btn btn-primary w-50  p-1' disabled={isProcessing}>{!isProcessing ? "Register" :
                                                <div className='spinner-grow spinner-grow-sm'></div>
                                            }</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col text-center"><p>Already have an account <Link to="/authentication/Login">Login</Link></p></div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
import React, { useState, useContext, useEffect } from 'react';
import { collection, doc, getDocs, serverTimestamp, setDoc, where, query } from "firebase/firestore/lite";
import { AuthContext } from '../../../context/AuthContext';
import { firestore } from '../../../config/firebase';

const initialState = {
    title: "",
    location: "",
    description: "",
}

export default function Events() {

    const { user } = useContext(AuthContext);
    const [state, setState] = useState(initialState);
    const [isProcesing, setIsProcesing] = useState(false);

    const handleChange = e => {
        setState(s => ({ ...s, [e.target.name]: e.target.value }));
    }


    const fetchDocument = async () => {
        let array = [];
        const q = query(collection(firestore, "events"), where("createdBy.uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            // doc.data() is never undefined for query doc snapshots
            // console.log(data);
            array.push(data);
        });


    }

    useEffect(() => {
        fetchDocument()
    },);

    const handleSubmit = e => {
        e.preventDefault();

        let { title, location, description } = state;

        title = title.trim();
        location = location.trim();
        description = description.trim();

        if (title.length < 3) {
            return window.notify("plz enter your title", "error");
        }
        if (location.length < 3) {
            return window.notify("plz enter your location", "error");
        }
        if (description.length < 10) {
            return window.notify("plz enter your description", "error");
        }

        let formData = { title, location, description }

        formData.dataCreated = serverTimestamp()
        formData.id = window.getRandomId()
        formData.status = "active"
        formData.createdBy = {
            email: user.email,
            uid: user.uid

        }

        createDocument(formData);
    }

    const createDocument = async (formData) => {
        setIsProcesing(true)
        try {
            await setDoc(doc(firestore, "events", formData.id), formData);
            window.notify("Event has been successfully added", "success")
        } catch (err) {
            window.notify("Something went wrong, Event isnt added", "error")
        }
        setIsProcesing(false)
    }

    return (
        <>
            <div className='py-5 home d-flex justify-content-center align-items-center'>
                <div className='container'>
                    <div className='row'>
                        <div className='col '>
                            <div className='card p-3 p-md-4 p-lg-5'>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col">
                                            <h2 className='text-center mb-4'>Add Events</h2>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <input type="text" name='title' className='form-control' placeholder='Enter Title' onChange={handleChange} />
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <input type="text" name='location' className='form-control' placeholder='Enter Your Location ' onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className='row my-3'>
                                        <div className="col-12">
                                            <textarea name="description" rows="5" className='form-control' placeholder='Enter Description' onChange={handleChange}></textarea>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col">
                                            <button className='btn btn-primary w-100' disabled={isProcesing}>{!isProcesing ?
                                                "Add Events" :
                                                <div className='spinner-border spinner-border-sm'></div>
                                            }</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

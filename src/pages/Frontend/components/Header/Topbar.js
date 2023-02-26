import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';


export default function Topbar() {

    const [currentTime, setCurrentTime] = useState("")
    useEffect(() => {

        setInterval(() => {
            setCurrentTime(dayjs().format("dddd MMMM,D YYYY, hh:mm:ss"))
        })
    }, [])
    return (
        <header>
            <div className='container-fluid bg-primary py-2'>
                <div className='row  '>

                    <div className='col text-center  text-white'>
                        <p className='mb-0'><strong>{currentTime}</strong></p>
                    </div>



                </div>
            </div>
        </header>


    )
}



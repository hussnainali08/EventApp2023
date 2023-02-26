import React from 'react'

export default function Footer() {

    const year = new Date().getFullYear()

    return (
        <>
            <div className="container-fluide bg-dark py-2">
                <div className="row">
                    <div className="col">
                        <p className='text-white text-center'>&copy;{year}. All Rights Reserved By <strong>Hussnain Ali</strong></p>
                    </div>
                </div>
            </div>
        </>
    )
}

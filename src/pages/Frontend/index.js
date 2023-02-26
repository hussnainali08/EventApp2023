import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './Home';
import Events from './Events';

export default function index() {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path='home' element={<Home />} />
                    <Route path='events' element={<Events />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}

"use client";

import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { login } from '../../redux/actions/authActions';
// import { useTranslation } from 'react-i18next';
// import { useSelector } from 'react-redux';
import { useEffect } from 'react';


export default function Login() {
    // const { t } = useTranslation();
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    // const loginError = useSelector((state) => state.auth.error);   
    const handleSubmit = (e) => {
        e.preventDefault();
        // dispatch(login(email, password));
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleErrorClose = () => {
        setError(null);
    };
    const handleForgotPassword = () => {
        navigate('/forgot-password');
    };
    const handleRegister = () => {
        navigate('/register');
    };
    
    // use tailwind css to style the form

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input type="email" id="email" value={email} onChange={handleEmailChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input type="password" id="password" value={password} onChange={handlePasswordChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{error}</span>
                        <span onClick={handleErrorClose} className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer">
                            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M10 9l5.5 5.5L16.5 16l-5.5-5.5L6.5 16l-.5-.5L10 9z"/></svg>
                        </span>
                    </div>
                )}
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline
                ">Login</button>
                <div className="mt-4">
                    <button onClick={handleForgotPassword} className="text-blue-500 hover:text-blue-700 focus:outline-none">Forgot Password?</button>
                </div>
                <div className="mt-4">
                    <button onClick={handleRegister} className="text-blue-500 hover:text-blue-700 focus:outline-none">Register</button>
                </div>
            </form>
            <div className="mt-4">
                <p className="text-gray-600 text-sm">Don't have an account? <span onClick={handleRegister} className="text-blue-500 hover:text-blue-700 cursor-pointer">Register</span></p>
            </div>
        </div>
    );
}
        
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flip, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserRegister = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get('https://fc-app.onrender.com/protected/')
    })
    const notifySuccess = () => {
        toast.success('User registered successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark", // Set the theme to dark
            transition: Flip, // Set the transition to flip
        });
    };

    const notifyError = (message) => {
        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark", // Set the theme to dark
            transition: Flip, // Set the transition to flip
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('https://fc-app.onrender.com/auth/register', { username:email, password });
            if (response.data.message === 'User added successfully!') {
                notifySuccess();
                navigate('/');
            }
        } catch (error) {
            notifyError(error.response.data.message || 'Registration failed. Please try again.');
            console.error(error.response.data);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="p-10 shadow-2xl rounded-3xl bg-[#4C7766] font-sans max-w-sm w-96">
            <h1 className="text-4xl text-center mb-6 font-bold text-black">User Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="relative my-6">
                        <input
                            type="text"
                            name="email"
                            id="email"
                            className="block w-full px-3 py-2 border border-black rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                            placeholder="Your Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="relative my-6">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="block w-full px-3 py-2 border border-black rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                            placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="relative my-6">
                        <input
                            type="password"
                            name="confpassword"
                            id="confpassword"
                            className="block w-full px-3 py-2 border border-black rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button
                        className="w-full py-2 mb-4 text-xl text-white bg-black rounded-full border-black border-2 hover:border-white"
                        type="submit"
                    >
                        Register
                    </button>

                    <div className="text-center font-semibold">
                        <span className="text-md text-stone-950">
                            Already have an account? <Link to="/userLogin" className="text-gray-50 underline hover:text-black">Sign In</Link>
                        </span>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default UserRegister;

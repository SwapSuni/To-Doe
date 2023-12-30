"use client"
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useSignInWithEmailAndPassword, useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const login = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);

    const router = useRouter();

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const handlelogin = async (e) => {
        e.preventDefault();
        console.log("clicked", email, password);
        signInWithEmailAndPassword(email, password);
        const res = await axios.post("/api/user/login", {
            email,
            password,
        });
        if (res?.data) {
            alert("Logged In successfully");
            router.push(`list/${res.data.user._id}`);
        }
    }

    const [
        createUserWithEmailAndPassword,
        user1,
        loading1,
        error1,
    ] = useCreateUserWithEmailAndPassword(auth);

    const handlesignup = async () => {
        createUserWithEmailAndPassword(email, password);
        // console.log("entered signup");
        const res = await axios.post("/api/user/register", {
            name,
            email,
            password
        });
        if (res?.data) {
            alert(res.data.msg);
            router.push(`list/${res.data.user._id}`);
        }
    }

    if (loading || loading1) {
        console.log("Loading...");
    }
    if (error) {
        console.log(error.message);
    }
    if (error1) {
        console.log(error1.message);
    }

    const handletoggle = () => {
        setLogin(!login);
    }
    return (
        <div className="h-screen w-screen bg-gradient-to-b from-cyan-400 to-cyan-800">
            <Head>
                <title>SASHASTRA | LOGIN-SIGNUP</title>
            </Head>
            <div className='flex items-center w-full h-3/4 text-slate-300 justify-center'>
                <div className='h-full w-3/6 border-2 mx-16 rounded-lg border-none mt-32 flex items-center justify-center'>
                    <div className='ml-5 mr-10 text-xl text-slate-100 font-semibold mt-5'>Please login or sign-up first..</div>
                    <div className='my-3 mx-5'>
                        <h2 className='font-bold text-3xl text-slate-100'>LOGIN / SIGN-UP</h2>
                        <div>
                            {
                                login ? ("") : (
                                    <>
                                        <h2 className='mt-5 mb-2'>Name :</h2>
                                        <input type='text' placeholder='enter your name...' className='h-10 w-80 rounded-md text-black p-2' onChange={(e) => setName(e.target.value)}></input>
                                    </>
                                )
                            }

                            <h2 className='mt-5 mb-2'>Email :</h2>
                            <input type='email' placeholder='enter your email....' className='h-10 w-80 rounded-md text-black p-2' onChange={(e) => setEmail(e.target.value)}></input>
                            <h2 className='mt-5 mb-2'>Password :</h2>
                            <input type='password' placeholder='enter your password....' className='h-10 w-80 rounded-md text-black p-2' onChange={(e) => setPassword(e.target.value)}></input>
                        </div>
                        <div className=''>
                            {login ? (
                                <button className='border rounded-lg py-1 px-3 my-8' onClick={handlelogin}>LOGIN</button>
                            ) : (
                                <button className='border rounded-lg py-1 px-3 my-8' onClick={handlesignup}>SIGN-UP</button>
                            )}

                            <span className='ml-12 cursor-pointer hover:underline' onClick={handletoggle}>{login ? "Don't have an account ?" : "Already have an account ?"}</span>
                        </div>
                    </div>
                </div>
                <div className='h-3/5 w-3/6 m-16 rounded-lg border-none'>
                    <div className='my-24 mx-8'>
                        <h2 className='font-bold text-3xl mb-8 text-slate-100'>What's your plan ?</h2>
                        <p className='font-semibold text-xl my-10'>Create your tasks, list them in your personal space and track your journey...</p>
                        <h3 className='font-bold text-2xl'>Everything in One Place..</h3>
                        {/* <h3 className='font-bold text-2xl'>Everything in Sashastra..</h3> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default login

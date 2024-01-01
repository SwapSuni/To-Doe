import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const List = () => {
    const [add, setAdd] = useState(false);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [tasks, setTasks] = useState([]);

    const router = useRouter();

    const [user] = useAuthState(auth);
    // console.log(user.email);

    useEffect(() => {
        if(add){
            setAdd(!add);
        }
        setAdd(false);
    }, [])

    const handlelogout = () => {
        router.push("/");
    }

    const handleadd = () => {
        setAdd(!add);
    }

    const handlenew = async () => {
        if(title=="" || desc==""){
            alert("Fill-in the task details");
        }
        else{
            const res = await axios.post(`/api/list/${router.query.id}`, {
                title: title,
                description: desc,
            })
            // console.log(res)
            setAdd(true);
            window.location.reload();
        }
    }

    const handledelete = async (itemId) => {
        console.log(itemId);
        const res = await axios.delete(`/api/list/${router.query.id}`, {
            data: {
                id: itemId,
            }
        })
        alert("Your list is just updated")
        setAdd(!add);
        window.location.reload();
    }

    const handleList = async () => {
        const res= await axios.get(`${process.env.BASE_URL}/api/list/${router.query.id}`)
        setTasks(res.data);
        console.log(tasks);
        setAdd(!add);
    }

    return (
        <div className='w-full bg-gradient-to-b from-cyan-400 via-cyan-600 to-cyan-800'>
            <Head>
                <title>SASHASTRA | TASKS</title>
            </Head>
            <div className='h-screen overflow-x-hidden overflow-y-auto'>
                <div className='text-white'>
                    <div className='flex justify-center'>
                        <h1 className='font-bold text-4xl mt-5'>PLAN - DOE - REPEAT</h1>
                    </div>
                    <div className='flex justify-between items-center mr-5 mt-5 text-lg '>
                        <button className='border-white border rounded-md ml-8 my-1 px-3 py-1' onClick={add ? handlelogout : handleadd}>{add ? "LOGOUT" : "ABORT"}</button>
                        <button className='border-white border rounded-md mx-3 my-1 px-3 py-1' onClick={add ? handleadd : handlenew}>Add a New Task</button>
                    </div>
                </div>
                {
                    add ? (
                        tasks.length > 0 ? (tasks.map((e) => {
                            return (
                                <div className='grid grid-cols-7 m-5 rounded-md border-2 text-slate-100' key={e._id}>
                                    <div className='col-span-2 border-r px-10 py-8 font-bold text-xl'>Title: {e.title}</div>
                                    <div className='col-span-4 border-r px-10 py-8 font-semibold text-lg'>Description: {e.description}</div>
                                    <div className='col-span-1 py-8'>
                                        <button className='ml-10 border-none bg-red-500 px-5 py-1 rounded-lg ' onClick={() => handledelete(e._id)}>Delete</button>
                                    </div>
                                </div>
                            )
                        })
                        ) : (
                            <div className='flex w-screen h-96 mt-10 items-center justify-center text-slate-300 text-lg'>
                                No tasks for you !!
                            </div>
                        )
                    ) : (
                        <>
                            <div className=''>
                                <div className='h-full w-full mt-16 overflow-hidden flex justify-center items-center'>
                                    <div className=' w-4/6 rounded-lg border-2 flex mb-5 h-5/6'>
                                        <div className='mx-5'>
                                            <div className='text-slate-200'>
                                                <h2 className=' mb-2 mt-5 underline'>Title :</h2>
                                                <input type='text' placeholder='enter the title' className='h-10 w-80 rounded-md text-black p-2' onChange={(e) => setTitle(e.target.value)}></input>

                                                <h2 className='mt-5 mb-2 underline'>Description :</h2>
                                                <textarea rows={5} cols={50} name='des' className='rounded-md text-black p-2 mb-5' onChange={(e) => setDesc(e.target.value)}></textarea>
                                            </div>
                                        </div>
                                        <div className='flex justify-center px-7 items-center'>
                                            <p className='text-white text-lg'>IKIGAI : Finding joy and Purpose in what you do !</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-center mt-2'>
                                <button className='underline text-slate-100' onClick={handleList}>View Your To-Doe List</button>
                            </div>
                        </>
                    )

                }
            </div>
        </div>
    )
}

export default List

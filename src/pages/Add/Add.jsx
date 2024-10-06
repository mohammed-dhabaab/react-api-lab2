import React, { useEffect, useState } from 'react'
import styles from '../../styles'
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaImage } from "react-icons/fa";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { USERS_API } from '../../data';

function Add() {
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [gender, setGender] = useState("")
    const navigate = useNavigate();

    const postData = async () => {
        const newData = {
            name,
            image,
            gender
        };
        try {
            const response = await axios.post(USERS_API, newData);
            navigate("/")
        } catch (error) {
            console.error("Error posting data:", error);
        }
    };

    // useEffect(() => {
    //     postData();
    // }, []);

    return (
        <main className={`${styles.outerWrapper}`}>
            <div className={`${styles.wrapper} flex flex-col gap-10 justify-center items-center`}>
                <h1 className={`${styles.heading2}`}>Add New Character</h1>
                <div className='flex flex-col gap-4'>
                    <div className='bg-primary-content gap-1 flex items-center px-4 py-3 rounded-md'>
                        <MdDriveFileRenameOutline />
                        <input onChange={(e) => setName(e.target.value)} className='' type="text" name="" id="" placeholder='Name' />
                    </div>

                    <div className='bg-primary-content gap-1 flex items-center px-4 py-3 rounded-md'>
                        <FaImage />
                        <input onChange={(e) => setImage(e.target.value)} className='' type="text" name="" id="" placeholder='Image' />
                    </div>

                    <div className='bg-primary-content gap-1 flex items-center px-4 py-3 rounded-md'>
                        <MdDriveFileRenameOutline />
                        <input onChange={(e) => setGender(e.target.value)} className='' type="text" name="" id="" placeholder='Gender' />
                    </div>

                    <button onClick={postData} className='btn btn-accent'>Add</button>
                    <Link to={"/"} className='text-center btn '>Home</Link>
                </div>

            </div>
        </main>

    )
}

export default Add
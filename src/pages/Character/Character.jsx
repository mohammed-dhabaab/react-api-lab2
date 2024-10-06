import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from '../../styles';
import axios from 'axios';
import { USERS_API } from '../../data';
import { MdEdit } from "react-icons/md";

function Character() {
    const { characterId } = useParams();
    const [update, setUpdate] = useState(true);
    const [updateImage, setUpdateImage] = useState(false);
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [species, setSpecies] = useState("");
    const [gender, setGender] = useState("");
    const [hair, setHair] = useState("");
    const [origin, setOrigin] = useState("");
    const [character, setCharacter] = useState({});

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${USERS_API}/${characterId}`);
                const characterData = response.data; // Use fetched data
                setCharacter(characterData);
                setImage(characterData.image);
                setName(characterData.name);
                setStatus(characterData.status);
                setSpecies(characterData.species);
                setGender(characterData.gender);
                setHair(characterData.hair);
                setOrigin(characterData.origin);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (characterId) {
            fetchPosts();
        }
    }, [characterId]);

    const updateCharacter = async () => {
        try {
            const response = await axios.put(`${USERS_API}/${characterId}`, {
                image,
                name,
                status,
                species,
                gender,
                hair,
                origin,
            });
            console.log("Update response:", response.data); // Log response
        } catch (error) {
            console.error("Error updating character:", error);
        }
    };


    return (
        <main className={`${styles.outerWrapper}`}>
            <div className={`${styles.wrapper}`}>
                <div className='bg-slate-800 rounded-md p-6 w-fit mx-auto'>
                    <div className={`relative flex justify-center items-center`}>
                        <img className='rounded-md' src={image} alt={character.name} />

                        {/* <div onClick={() => setUpdateImage(!updateImage)} className='cursor-pointer absolute -top-3 -right-3 bg-slate-600 p-2 rounded-full'>
                            <MdEdit />
                        </div> */}
                        {update ?
                            (<div className='absolute'>
                                <input onChange={(e) => setImage(e.target.value)} value={image} className='bg-slate-900 px-3 py-2 rounded-md shadow-lg' type="text" placeholder='Image' />
                            </div>) : null
                        }

                    </div>
                    <div className='flex flex-col gap-2 mt-4'>
                        <h2>
                            <strong>Name: </strong>
                            {update ? (
                                <input
                                    className='border-b border-solid border-slate-700'
                                    type="text"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                />
                            ) : (
                                character.name || ""
                            )}
                        </h2>
                        <p>
                            <strong>Status:</strong> {update ? (
                                <input
                                    className='border-b border-solid border-slate-700'

                                    type="text"
                                    onChange={(e) => setStatus(e.target.value)}
                                    value={status}
                                />
                            ) : (
                                character.status || ""
                            )}
                        </p>
                        <p>
                            <strong>Species:</strong> {update ? (
                                <input
                                    className='border-b border-solid border-slate-700'

                                    type="text"
                                    onChange={(e) => setSpecies(e.target.value)}
                                    value={species}
                                />
                            ) : (
                                character.species || ""
                            )}
                        </p>
                        <p>
                            <strong>Gender:</strong> {update ? (
                                <input
                                    className='border-b border-solid border-slate-700'

                                    type="text"
                                    onChange={(e) => setGender(e.target.value)}
                                    value={gender}
                                />
                            ) : (
                                character.gender || ""
                            )}
                        </p>
                        <p>
                            <strong>Hair:</strong> {update ? (
                                <input
                                    className='border-b border-solid border-slate-700'

                                    type="text"
                                    onChange={(e) => setHair(e.target.value)}
                                    value={hair}
                                />
                            ) : (
                                character.hair || ""
                            )}
                        </p>
                        <p>
                            <strong>Origin:</strong> {update ? (
                                <input
                                    className='border-b border-solid border-slate-700'

                                    type="text"
                                    onChange={(e) => setOrigin(e.target.value)}
                                    value={origin}
                                />
                            ) : (
                                character.origin || ""
                            )}
                        </p>
                        <button onClick={() => setUpdate(!update)} className='mt-6 btn btn-accent'>
                            {update ? "Unedit" : "Edit"}
                        </button>
                        {update ? (
                            <button onClick={updateCharacter} className='btn btn-primary mt-2'>Confirm</button>
                        ) : null}
                        <Link to="/" className='btn mt-2 font-bold'>Home</Link>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Character;
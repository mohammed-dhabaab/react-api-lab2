import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from '../../styles';
import axios from 'axios';
import { USERS_API } from '../../data';

function Character() {
    const { characterId } = useParams()
    const [character, setCharacter] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${USERS_API}/${characterId}`);
                setCharacter(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (characterId) {
            fetchPosts();
        }
    }, [characterId]);


    return (
        <main className={`${styles.outerWrapper}`}>
            <div className={`${styles.wrapper} `}>
                {
                    <div className='bg-slate-800 rounded-md p-6 w-fit mx-auto'>
                        <div className='flex justify-center items-center'>
                            <img className='rounded-md' src={character.image} alt={character.name} />
                        </div>
                        <div className='flex flex-col mt-4'>
                            <h2><strong>Name:</strong> {character.name || ""}</h2>
                            <p><strong>Status:</strong>  {character.status || ""}</p>
                            <p><strong>Species:</strong>  {character.species || ""}</p>
                            <p><strong>Gender:</strong>  {character.gender || ""}</p>
                            <p><strong>Hair:</strong>  {character.hair || ""}</p>
                            <p><strong>Origin:</strong>  {character.origin || ""}</p>
                            <Link to={"/"} className='btn btn-primary mt-6 font-bold'>Home</Link>
                        </div>
                    </div>
                }

            </div>
        </main>
    )
}

export default Character
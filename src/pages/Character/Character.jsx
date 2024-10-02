import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from '../../styles';
import axios from 'axios';

function Character() {
    const { characterId } = useParams()
    const [character, setCharacter] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`https://6657369e9f970b3b36c865b0.mockapi.io/Images/${characterId}`);
                setCharacter(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        // Only fetch if characterId is defined  
        if (characterId) {
            fetchPosts();
        }
    }, [characterId]);
    return (
        <main className={`${styles.outerWrapper}`}>
            <div className={`${styles.wrapper} `}>
                {
                    <div className='bg-slate-800 rounded-md p-6 w-fit mx-auto'>
                        <div>
                            <img className='rounded-md' src={character.image} alt={character.name} />
                        </div>
                        <div className='flex flex-col mt-4'>
                            <h2>Name: {character.name}</h2>
                            <p>Status: {character.status}</p>
                            <p>Species: {character.species}</p>
                            <p>Gender: {character.gender}</p>
                            <p>Hair: {character.hair}</p>
                            <p>Origin: {character.origin}</p>
                        </div>
                    </div>
                }
            </div>
        </main>
    )
}

export default Character
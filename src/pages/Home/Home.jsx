import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure to import axios
import styles from '../../styles';
import { Link } from 'react-router-dom';

function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("https://6657369e9f970b3b36c865b0.mockapi.io/Images/");
                console.log(response.data);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchPosts();
    }, []);

    return (
        <main className={`${styles.outerWrapper}`}>
            <div className={`${styles.wrapper} px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8`}>
                {data.length > 0 ? data.map((character, index) => (
                    <Link to={`/character/${(index + 1)}`} key={index} className='bg-slate-800 rounded-md p-6'>
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
                    </Link>
                )) : <p>Loading...</p>}
            </div>
        </main>
    );
}

export default Home;
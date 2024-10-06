import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure to import axios  
import styles from '../../styles';
import { Link } from 'react-router-dom';
import { IoMdSearch } from "react-icons/io";
import { USERS_API } from '../../data';

function Home() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState(''); // Initialize search as an empty string  

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await axios.get(USERS_API);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchCharacters();
    }, []);

    const deleteCharacters = async (characterId) => {
        try {
            await axios.delete(`${USERS_API}/${characterId}`);
            setData((prevData) => prevData.filter(character => character.id !== characterId));
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    // Function to filter the data based on search input  
    const filteredData = data.filter(character =>
        character.name && character.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <main className={`${styles.outerWrapper}`}>
            <div className='flex items-center justify-center mb-6 gap-2'>
                <div className='bg-primary-content flex items-center rounded-md'>
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        className='px-4 py-3 '
                        type="search"
                        placeholder='Search'
                        value={search} // Bind the search input value  
                    />
                    <div className='h-full rounded-md px-4 py-4 bg-slate-800 cursor-pointer'>
                        <IoMdSearch size={20} />
                    </div>
                </div>
                <Link to={"/add"} className='btn btn-accent'>Add</Link>
            </div>
            <div className={`${styles.wrapper} px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8`}>
                {filteredData.length > 0 ? filteredData.map((character, index) => (
                    <div key={index} className='bg-slate-800 rounded-md p-6'>
                        <div className='w-full'>
                            <img className='w-full h-full rounded-md mx-auto' src={character.image} alt={character.name} />
                        </div>
                        <div className='flex flex-col mt-4'>
                            <h2><strong>Name:</strong> {character.name}</h2>
                            <div className='flex items-center gap-3 mt-6'>
                                <Link to={`/character/${character.id}`} className='w-3/4 btn btn-primary font-bold'>Details</Link>
                                <button onClick={() => deleteCharacters(character.id)} className='w-1/4 btn btn-error btn-outline'>Delete</button>
                            </div>
                        </div>
                    </div>
                )) : <p>No results found.</p>}
            </div>
        </main>
    );
}

export default Home;
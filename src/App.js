import React, { useState } from 'react';
import NameInput from './Components/NameInput.js';
import Earth from './Earth.svg';
import './index.css';

const App = () => {
  const [userName, setUserName] = useState('');
  const [country, setCountry] = useState('');
  const [probability, setProbability]= useState('');
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.nationalize.io/?name=${userName}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      
      if (data.country && data.country.length > 0) {
        const topCountry = data.country[0];
        setProbability(topCountry.probability);
        setCountry(topCountry.country_id);
        setError('');
      } else {
        setCountry('');
        setError('Country not found');
      }
    } catch (error) {
      setCountry('');
      setError('Error fetching data');
      console.error(error);
    }
  };

  return (
    <div className= 'flex flex-col space-y-10 justify-center'>
      <h1 className='font-serif text-6xl line-clamp-1 text-center text-white'> Discover your Name's Origin</h1>
      <img className='h-80 min-h-64' src={Earth} alt='Earth'></img>
      <NameInput  userName={userName} setUserName={setUserName} />
      <button className= " h-15 p-1 pb-2 bg-white text-dark-blue place-self-center rounded-full font-serif"onClick={handleSearch}>Search</button>
      {country && 
        <div className='p-10 bg-light-blue w-full max-w-94 h-10 mt-10 place-self-center rounded shadow-sm'> 
        <h2 className='font-serif text-3xl text-center text-pb-10 text-dark-blue'>Country: {country + '  '+ Math.round(probability * 100) / 100 + '%'}</h2>
        </div>
      }
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p className='p10 bg-purple text-white text-xl w-full text-right place-self-end fixed bottom-0'> This Website Was Created using React.js </p>
    </div>
  );
};

export default App;
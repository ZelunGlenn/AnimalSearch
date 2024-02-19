import { useState, useEffect } from 'react';

function App() {

  const {search, animals} = UseAnimalSearch();
  return (
    <>
      <input 
        type="text"
        placeholder="Search"
        onChange={e => search(e.target.value)}
      />

      <ul>
        {animals.map(
          animal => <Animal key={animal.id} {...animal} />
        )}
        {animals.length === 0 && 'No animals searched'}
      </ul>
    </>
  )
}



const UseAnimalSearch = () => {
  const [animals, setAnimals] = useState([]);
  
  // for store the last search result in local storage
  useEffect(() => {
    const lastQuery = localStorage.getItem('lastQuery');
    search(lastQuery);
  }, [])

  const search = async(q) => {
    const response = await fetch(
      'http://localhost:8080?' + new URLSearchParams({ q })
    );
    const data = await response.json();
    setAnimals(data);

    localStorage.setItem('lastQuery', q);
  };
  return {search, animals};
};

const Animal = ({ type, name, age }) => {
  return (
    <li>
      <strong>{type}</strong> {name} ({age} years old)
    </li>
  );
};

export default App

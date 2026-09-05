import { useState } from 'react';

// Your actual API key from the screenshot
const API_URL = "https://www.omdbapi.com/?apikey=yourapikey";

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // 1. New state to hold the array of movie results
  const [movies, setMovies] = useState([]); 

  // 2. The async function to fetch data
  const searchMovies = async (title) => {
    // fetch() makes the network request
    const response = await fetch(`${API_URL}&s=${title}`);
    
    // Convert the raw response into JSON
    const data = await response.json();

    // 3. OMDb returns the movies in an array called "Search"
    if (data.Search) {
      setMovies(data.Search);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Movie Search App</h1>
      
      <div>
        <input 
          type="text" 
          placeholder="Search for movies..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => searchMovies(searchTerm)}>
          Search
        </button>
      </div>

      {/* 4. Map over the movies array to display the titles */}
      <div style={{ marginTop: '20px' }}>
        {movies.map((movie) => (
          <div key={movie.imdbID} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
            <strong>{movie.Title}</strong> ({movie.Year})
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
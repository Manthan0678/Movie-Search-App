import { useState } from 'react';
import MovieCard from './MovieCard';

const API_URL = "https://www.omdbapi.com/?apikey=a553d520";

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]); 
  
  // 1. New state to hold error messages
  const [error, setError] = useState(null); 

  const searchMovies = async (title) => {
    if (!title) return; 

    // Reset previous results and errors before starting a new search
    setMovies([]);
    setError(null);

    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    // 2. OMDb returns Response: "True" if it found movies, and "False" if it failed
    if (data.Response === "True") {
      setMovies(data.Search);
    } else {
      setError(data.Error); // e.g., "Movie not found!"
    }
  };

  // 3. Shift the layout to the top if we have movies OR an error
  const hasSearched = movies.length > 0 || error !== null;

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: hasSearched ? 'flex-start' : 'center', 
      justifyContent: hasSearched ? 'flex-start' : 'center', 
      minHeight: '100vh', 
      padding: '40px', 
      fontFamily: 'sans-serif',
      boxSizing: 'border-box'
    }}>
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: hasSearched ? 'flex-start' : 'center',
        width: '100%',
        marginBottom: '30px'
      }}>
        <h1>Movie Finder</h1>
        
        <div style={{ display: 'flex', marginTop: '10px' }}>
          <input 
            type="text" 
            placeholder="Search for a movie..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchMovies(searchTerm)}
            style={{ padding: '10px', fontSize: '18px', width: '300px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button 
            onClick={() => searchMovies(searchTerm)} 
            style={{ padding: '10px 20px', fontSize: '18px', marginLeft: '10px', cursor: 'pointer', borderRadius: '4px', border: 'none', backgroundColor: '#007BFF', color: 'white' }}
          >
            Search
          </button>
        </div>
      </div>

      {/* 4. Display the error message in red if it exists */}
      {error && (
        <div style={{ color: 'red', fontSize: '1.2rem', marginTop: '20px' }}>
          {error}
        </div>
      )}

      {/* The Movie Grid */}
      {!error && hasSearched && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
      
    </div>
  );
}

export default App;
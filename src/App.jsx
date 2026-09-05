import { useState } from 'react';
import MovieCard from './MovieCard';

const API_URL = `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}`;

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]); 
  const [error, setError] = useState(null); 

  const searchMovies = async (title) => {
    if (!title) return; 

    setMovies([]);
    setError(null);

    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    if (data.Response === "True") {
      setMovies(data.Search);
    } else {
      setError(data.Error);
    }
  };

  const hasSearched = movies.length > 0 || error !== null;

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: hasSearched ? 'flex-start' : 'center', 
      justifyContent: hasSearched ? 'flex-start' : 'center', 
      minHeight: '100vh', 
      padding: '20px', // Reduced padding for better mobile view
      fontFamily: 'sans-serif',
      boxSizing: 'border-box',
      width: '100%'
    }}>
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: hasSearched ? 'flex-start' : 'center',
        width: '100%',
        marginBottom: '30px'
      }}>
        <h1 style={{ textAlign: 'center' }}>Movie Finder</h1>
        
        {/* Responsive Search Container */}
        <div style={{ 
          display: 'flex', 
          width: '100%', 
          maxWidth: '500px', // Prevents it from being too long on desktop
          gap: '10px', // Adds space between input and button safely
          marginTop: '10px' 
        }}>
          <input 
            type="text" 
            placeholder="Search for a movie..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchMovies(searchTerm)}
            style={{ 
              flex: 1, // Tells the input to take up all remaining space securely
              padding: '12px', 
              fontSize: '16px', 
              borderRadius: '4px', 
              border: '1px solid #ccc',
              minWidth: 0 // Prevents the input from overflowing its container
            }}
          />
          <button 
            onClick={() => searchMovies(searchTerm)} 
            style={{ 
              padding: '12px 20px', 
              fontSize: '16px', 
              cursor: 'pointer', 
              borderRadius: '4px', 
              border: 'none', 
              backgroundColor: '#007BFF', 
              color: 'white',
              whiteSpace: 'nowrap' // Prevents the word "Search" from breaking onto two lines
            }}
          >
            Search
          </button>
        </div>
      </div>

      {error && (
        <div style={{ color: 'red', fontSize: '1.2rem', marginTop: '20px', textAlign: 'center' }}>
          {error}
        </div>
      )}

      {/* The Movie Grid - added justifyContent center for better mobile wrapping */}
      {!error && hasSearched && (
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '20px', 
          width: '100%', 
          justifyContent: 'center' 
        }}>
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
      
    </div>
  );
}

export default App;
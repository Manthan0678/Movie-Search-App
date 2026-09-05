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
      padding: '20px', 
      fontFamily: 'sans-serif',
      boxSizing: 'border-box',
      width: '100%',
      backgroundColor: 'transparent',
      color: 'inherit'
    }}>
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: hasSearched ? 'flex-start' : 'center',
        width: '100%',
        marginBottom: '30px'
      }}>
        <h1 style={{ textAlign: 'center' }}>Movie Finder</h1>
        
        <div style={{ 
          display: 'flex', 
          width: '100%', 
          maxWidth: '500px', 
          gap: '10px', 
          marginTop: '10px' 
        }}>
          <input 
            type="text" 
            placeholder="Search for a movie..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchMovies(searchTerm)}
            style={{ 
              flex: 1, 
              padding: '12px', 
              fontSize: '16px', 
              borderRadius: '4px', 
              border: '2px solid #555', /* Slightly stronger border so it doesn't look faint */
              backgroundColor: 'transparent',
              color: 'inherit',
              minWidth: 0 
            }}
          />
          <button 
            onClick={() => searchMovies(searchTerm)} 
            style={{ 
              padding: '12px 20px', 
              fontSize: '16px', 
              cursor: 'pointer', 
              borderRadius: '4px', 
              border: '2px solid #007BFF', 
              backgroundColor: '#007BFF', 
              color: 'white',
              whiteSpace: 'nowrap' 
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
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
      alignItems: 'center', 
      justifyContent: hasSearched ? 'flex-start' : 'center', 
      minHeight: '100vh', 
      padding: '40px 20px', 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      boxSizing: 'border-box',
      width: '100%',
      backgroundColor: '#f4f6f8', /* Soft background to make elements pop */
      color: '#333'
    }}>
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        width: '100%',
        marginBottom: '40px'
      }}>
        <h1 style={{ 
          textAlign: 'center', 
          fontSize: '2.5rem', 
          fontWeight: '800', 
          marginBottom: '24px',
          color: '#1a1a1a'
        }}>
          Movie Finder
        </h1>
        
        {/* Modern, elevated search bar */}
        <div style={{ 
          display: 'flex', 
          width: '100%', 
          maxWidth: '500px', 
          gap: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          borderRadius: '8px',
          backgroundColor: '#ffffff',
          padding: '8px'
        }}>
          <input 
            type="text" 
            placeholder="Search for a movie..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchMovies(searchTerm)}
            style={{ 
              flex: 1, 
              padding: '12px 16px', 
              fontSize: '16px', 
              borderRadius: '6px', 
              border: 'none', 
              outline: 'none', 
              backgroundColor: 'transparent',
              minWidth: 0
            }}
          />
          <button 
            onClick={() => searchMovies(searchTerm)} 
            style={{ 
              padding: '12px 24px', 
              fontSize: '16px', 
              fontWeight: '600',
              cursor: 'pointer', 
              borderRadius: '6px', 
              border: 'none', 
              backgroundColor: '#0066cc', 
              color: 'white',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 4px rgba(0,102,204,0.3)'
            }}
          >
            Search
          </button>
        </div>
      </div>

      {/* Styled error message badge */}
      {error && (
        <div style={{ 
          color: '#d32f2f', 
          backgroundColor: '#ffebee', 
          padding: '12px 24px', 
          borderRadius: '8px',
          fontSize: '1.1rem', 
          fontWeight: '500',
          textAlign: 'center' 
        }}>
          {error}
        </div>
      )}

      {!error && hasSearched && (
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '24px', 
          width: '100%', 
          maxWidth: '1200px', // Keeps grids from spreading infinitely on wide monitors
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
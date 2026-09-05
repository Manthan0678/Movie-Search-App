import { useState } from 'react';
import MovieCard from './MovieCard';

const API_URL = "https://www.omdbapi.com/?apikey=your_api_key"; // Replace with your actual OMDB API key

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]); 

  const searchMovies = async (title) => {
    // Only search if the user actually typed something
    if (!title) return; 

    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    if (data.Search) {
      setMovies(data.Search);
    }
  };

  // Boolean variable to check if we have results
  const hasSearched = movies.length > 0;

  return (
    <div style={{ 
      // This is where the magic happens:
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: hasSearched ? 'flex-start' : 'center', 
      justifyContent: hasSearched ? 'flex-start' : 'center', 
      minHeight: '100vh', 
      padding: '40px', 
      fontFamily: 'sans-serif',
      boxSizing: 'border-box'
    }}>
      
      {/* Container for the Header and Search Bar */}
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
            // Allows pressing "Enter" to search
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

      {/* The Movie Grid - Only renders if hasSearched is true */}
      {hasSearched && (
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
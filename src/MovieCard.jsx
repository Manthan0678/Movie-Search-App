const MovieCard = ({ movie }) => {
  const imdbUrl = `https://www.imdb.com/title/${movie.imdbID}/`;

  return (
    <a 
      href={imdbUrl} 
      target="_blank" 
      rel="noopener noreferrer" 
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div style={{ 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        padding: '10px', 
        width: '200px',
        backgroundColor: '#f9f9f9',
        cursor: 'pointer', 
        height: '100%',
        boxSizing: 'border-box'
      }}>
        <img 
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300'} 
          alt={movie.Title} 
          style={{ width: '100%', borderRadius: '4px' }} 
        />
        <h3 style={{ fontSize: '1.1rem', margin: '10px 0 5px' }}>{movie.Title}</h3>
        <p style={{ margin: 0, color: '#555' }}>{movie.Year}</p>
      </div>
    </a>
  );
};

export default MovieCard;
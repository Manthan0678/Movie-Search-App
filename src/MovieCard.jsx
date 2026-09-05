// The { movie } inside the parentheses is the "prop" passed down from App.jsx
const MovieCard = ({ movie }) => {
  return (
    <div style={{ 
      border: '1px solid #ddd', 
      borderRadius: '8px', 
      padding: '10px', 
      width: '200px',
      backgroundColor: '#f9f9f9'
    }}>
      {/* We check if a poster exists, otherwise we show a placeholder image */}
      <img 
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300'} 
        alt={movie.Title} 
        style={{ width: '100%', borderRadius: '4px' }} 
      />
      <h3 style={{ fontSize: '1.1rem', margin: '10px 0 5px' }}>{movie.Title}</h3>
      <p style={{ margin: 0, color: '#555' }}>{movie.Year}</p>
    </div>
  );
};

export default MovieCard;
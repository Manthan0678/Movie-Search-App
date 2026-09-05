import { useState } from 'react';

function App() {
  // 1. Set up state to track the search input
  const [searchTerm, setSearchTerm] = useState('');

  // 2. Create a function that triggers when we click Search
  const searchMovies = async (title) => {
    // We will add your API fetch logic here in the next step
    console.log("Searching OMDb for:", title);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Movie Search App</h1>
      
      {/* 3. The Search Bar */}
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

      <p>Current search state: <strong>{searchTerm}</strong></p>
    </div>
  );
}

export default App;
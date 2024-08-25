import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [inputData, setInputData] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/bfhl', { data: JSON.parse(inputData) });
      setResponseData(response.data);
      setSelectedFilters([]); // Reset filters on new submission
      setErrorMessage(null);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'Error processing data');
      } else {
        setErrorMessage('Network error');
      }
    }
  };

  const handleFilterChange = (event) => {
    setSelectedFilters(event.target.value);
  };

  const getFilteredData = () => {
    if (!responseData) return null;

    const filteredData = {};
    for (const key in responseData) {
      if (selectedFilters.includes(key) && key !== 'is_success' && key !== 'user_id' && key !== 'email' && key !== 'roll_number') {
        filteredData[key] = responseData[key];
      }
    }
    return filteredData;
  };

  return (
    <div>
      <h1>{rollNumber}</h1> {/* Replace with your roll number */}
      <textarea
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        placeholder="Enter JSON data"
      />
      <button onClick={handleSubmit}>Submit</button>
      {errorMessage && <p>{errorMessage}</p>}
      {responseData && (
        <div>
          <h2>Filtered Response</h2>
          <select multiple onChange={handleFilterChange}>
            <option value="numbers">Numbers</option>
            <option value="alphabets">Alphabets</option>
            <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
          </select>
          <pre>{JSON.stringify(getFilteredData(), null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
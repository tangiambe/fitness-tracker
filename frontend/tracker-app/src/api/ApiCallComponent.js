import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ApiCallComponent({ apiUrl, method, requestBody, onResponse }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Make the API call using axios
    axios({
      method: method,
      url: apiUrl,
      data: requestBody,
    })
      .then((response) => {
        // Handle the response data as needed
        setData(response.data);

        // Call the onResponse callback with the response data
        if (onResponse) {
          onResponse(response.data);
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error:', error);
      });
  }, [apiUrl, method, requestBody, onResponse]);

  return (
    <div>
      <h2>API Response:</h2>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ApiCallComponent;

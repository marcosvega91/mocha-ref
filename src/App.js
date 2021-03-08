import React, { Component, useEffect } from 'react';
import Child from './Child';

function App() {
  useEffect(() => {
    fetch('http://localhost:8080/api/getList', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pagination: {
          pageSize: 10,
          pageNo: 0,
          sortedColumn: 'createdBy',
          sortedType: 'asc',
        },
      }),
    })
      .then(async (response) => {
        console.log('Fetch complete: ', await response.json());
      })
      .catch((error) => {
        console.error('Failed to fetch: ', error);
      });
  }, []);

  return (
    <React.Fragment>
      <h1>App</h1>
    </React.Fragment>
  );
}

export default App;

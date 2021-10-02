import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { gql, useQuery } from '@apollo/client';

const getUser = async () => {
  const response = await fetch('http://localhost:6013/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/text',
    }
  });

  if (response.status !== 200) {
    console.error('getUser error!');
  }

  return response;
}

const createUser = async (name: string) => {
  const response = await fetch('http://localhost:6013/', {
    method: 'POST',
    body: JSON.stringify({
      name: name
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.status !== 201) {
    console.error('createUser error!');
  }

  return response;
}

const getUserQuery = gql`
  query user {
    getUser
  }
`;

const App = () => {
  const [user, setUser] = useState('');

  const response = useQuery<{ getUser: string } >(getUserQuery);

  useEffect(() => {
    createUser('Vanya')
      .then(async (res) => await res.text())
      .then((data) => console.log(data))
      .catch((errorReason) => console.error(errorReason));

    getUser()
      .then(async (res) => await res.text())
      .then((data) => setUser(data))
      .catch((errorReason) => console.error(errorReason));

  }, []);

  useEffect(() => {
    console.log(response.data?.getUser);
  }, [response])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          { user }
        </a>
      </header>
    </div>
  );
}

export default App;

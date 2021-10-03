import React, { useCallback, useEffect, useState } from 'react';
import logo from './DirtySasha.png';
import './App.css';
import { gql, useMutation, useQuery } from '@apollo/client';
import styled from 'styled-components';
import { margin, MarginProps } from 'styled-system';

const getUserQuery = gql`
  query user {
    getUser
  }
`;

const createUserMutation = gql`
  mutation user($input: String!) {
    createUser(name: $input)
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.label<MarginProps>`
  ${margin}
`;

const Input = styled.input<MarginProps>`
  ${margin}
  padding: 4px 10px;

  width: 200px;
  height: 30px;

  border: 1px  solid black;
  border-radius: 6px;
`;

const Button = styled.button<MarginProps>`
  ${margin}
  padding: 4px 10px;

  width: 200px;
  height: 30px;

  border: 1px solid black;
  border-radius: 6px;

  &:hover {
    background: #61DAFB;
  }
`;

const App = () => {
  const [user, setUser] = useState('');
  const [name, setName] = useState('');

  const [newUser] = useMutation<{ createUser: string }>(createUserMutation, { refetchQueries: [getUserQuery] });
  const { data: getUserData } = useQuery<{ getUser: string }>(getUserQuery);

  const onCreateButtonClick = useCallback(() => {
    console.log('input value in button:', name);
    newUser({
      variables: {
        input: name
      }
    });
  }, [newUser, name]);

  const handleInputchange = useCallback((e) => setName(e.target.value), []);

  useEffect(() => {
    setUser(getUserData?.getUser || '');
  }, [getUserData?.getUser])

  const handleFormSubmit = useCallback((e) => e.preventDefault(), []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Кто сегодня мужчина судьбы?</h2>
        <Form onSubmit={handleFormSubmit}>
          <Label>Вот этот молодой человек:</Label>
          <Input mt="10px" type="text" value={name} onChange={handleInputchange}/>
          <Button mt="10px" onClick={onCreateButtonClick}>Да, да, этот</Button>
        </Form>
        <h3 className="App-link">
          { user || '...' } свеж молод светел!
        </h3>
      </header>
    </div>
  );
}

export default App;

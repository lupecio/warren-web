import React, { useState, useEffect, FormEvent } from 'react';
import { useHistory, Link } from 'react-router-dom';
import api from '../../services/api';

import { Container, Form, Error } from './styles';

interface User {
  id: string;
  name: string;
  email: string;
}

const Register: React.FC = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputError, setInputError] = useState('');

  async function handleRegister(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (!name) {
      setInputError('Digite o nome');
      return;
    }

    if (!email) {
      setInputError('Digite o email');
      return;
    }

    if (!password) {
      setInputError('Digite o senha');
      return;
    }

    try {
      const response = await api.post<User>('users', {
        name,
        email,
        password
      });

      const user = response.data;

      setInputError('');

      if (user) {
        history.push('/login');
      }
    } catch (err) {
      setInputError('Erro ao realizar o cadastro');
    }
  }

  return (
    <>
      <Container>
        <h1>Warren Test</h1>
        <Form hasError={!!inputError} onSubmit={handleRegister}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Digite seu nome." />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite o email." />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Digite a senha." />

          <button type="submit">Cadastrar</button>
        </Form>

        <Link to='login'>
          Login
        </Link>

        {inputError && <Error>{inputError}</Error>}
      </Container>
    </>
  )
}

export default Register;

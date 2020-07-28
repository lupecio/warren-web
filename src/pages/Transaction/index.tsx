import React, { useState, FormEvent, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { Form, Error, Container } from './styles';

interface Transaction {
  description: string | null;
  price: number;
}

interface TransactionProps {
  name: string;
  transaction_type: number;
}

interface User {
  balance: number;
}

interface Session {
  user: {
    id: string;
    name: string;
    email: string;
    balance: number;
  }
  token: string;
}

const Transaction: React.FC<TransactionProps> = ({ name, transaction_type }) => {
  const history = useHistory();
  const [inputError, setInputError] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [auth, setAuth] = useState<Session | null>(null);
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  async function handleTransaction(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (!price) {
      setInputError('Digite o preço');
      return;
    }

    if (!description && name === 'Pagamento') {
      setInputError('Digite a descrição');
      return;
    }

    try {
      let auth = null;
      const authStoraged = localStorage.getItem('@WarrenTest:session');

      if (authStoraged) {
        auth = JSON.parse(authStoraged);
        setAuth(auth);
      } else {
        history.push('login');
      }

      const response = await api.post<Transaction>('transactions', {
        description,
        price,
        transaction_type
      }, {
          headers: {
            'Authorization': `Basic ${auth && auth.token}`
          }
        });

      const transaction = response.data;

      if (transaction) {
        setTransaction(transaction);
      }

      setInputError('');
    } catch (err) {
      setInputError(err.response.data.message);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      api.get<User>('users/balance', {
        headers: {
          'Authorization': `Basic ${auth && auth.token}`
        }
      }).then(response => {
        const { balance } = response.data;

        if (auth) {
          auth.user.balance = balance;
          localStorage.setItem('@WarrenTest:session', JSON.stringify(auth));
          history.push('/');
        }
      });
    }, 100);
  }, [transaction]);

  return (
    <>
      <Container>
        <Link to="/">
          Voltar
        </Link>
        <Form hasError={!!inputError} onSubmit={handleTransaction}>
          <h2>{name}</h2>
          <input value={price} onChange={(e) => setPrice(parseInt(e.target.value) || 0)} placeholder="Digite o valor." />
          {name === 'Pagamento' && <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Digite a descrição." />}

          <button type="submit">Salvar</button>

          {inputError && <Error>{inputError}</Error>}
        </Form>
      </Container>
    </>
  )
}

export default Transaction;

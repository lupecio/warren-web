import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import api from '../../services/api';
import moment from 'moment';

import { Card, Balance, Bills, Container } from './styles';

interface Bill {
  id: string;
  transaction_type: number;
  created_at: Date;
  price: number;
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

const Dashboard: React.FC = () => {
  const history = useHistory();
  const [auth, setAuth] = useState<Session | null>(null);
  const [bills, setBills] = useState<Bill[] | null>(null);

  useEffect(() => {
    let auth = null;
    const authStoraged = localStorage.getItem('@WarrenTest:session');

    if (authStoraged) {
      auth = JSON.parse(authStoraged);
      setAuth(auth);
    } else {
      history.push('login');
    }

    api.get<Bill[]>('/transactions', {
      headers: {
        'Authorization': `Basic ${auth && auth.token}`
      }
    }).then(response => {
      const bills = response.data;
      setBills(bills);
    });
  }, []);

  function transactionType(transactionType: number) {
    switch (transactionType) {
      case 1:
        return 'Depósito'
      case 2:
        return 'Pagamento'
      case 3:
        return 'Retirada'
      default:
        break;
    }
  }

  return (
    <>
      <Container>
        <Card>
          <Link to={'/bill'}>
            Pagamento
          </Link>
        </Card>
        <Card>
          <Link to={'/withdraw'}>
            Saque
          </Link>
        </Card>
        <Card>
          <Link to={'/deposit'}>
            Depósito
          </Link>
        </Card>
      </Container>

      <Balance>
        <h1>Saldo R$ {auth && auth.user.balance}</h1>
      </Balance>

      {bills && bills.length > 0 ? <Bills>
        <h2>Extrato</h2>
        {bills.map(bill => (
          <>
            <div key={bill.id}>
              <span>{transactionType(bill.transaction_type)} -</span>
              <span>R$ {bill.price} -</span>
              <span>{moment(bill.created_at).format('DD/MM/YYYY')}</span>
            </div>
          </>
        ))}
      </Bills> : <span>Sem transações</span>}
    </>
  )
}

export default Dashboard;

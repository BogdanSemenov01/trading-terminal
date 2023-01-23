import React, { useState } from 'react';
import WSConnector from './WSClient';
import './App.css';
import Ticker from './Ticker';
import OrderList from './OrderList';

const ws = new WSConnector
const state = [
  {
    id: 1, 
    creationTime: '2023-01-22', 
    changeTime: '16:33:02', 
    status: 'active', 
    side: 'sell', 
    price: 10, 
    amount: 10, 
    instrument: 'eur_usd'
  },
  {
    id: 2, 
    creationTime: '2023-01-22', 
    changeTime: '16:33:02', 
    status: 'filled', 
    side: 'buy', 
    price: 10, 
    amount: 10, 
    instrument: 'eur_usd'
  },
  {
    id: 3, 
    creationTime: '2023-01-22', 
    changeTime: '16:33:02', 
    status: 'rejected', 
    side: 'sell', 
    price: 10, 
    amount: 10, 
    instrument: 'eur_usd'
  },
  {
    id: 4, 
    creationTime: '2023-01-22', 
    changeTime: '16:33:02', 
    status: 'cancelled', 
    side: 'sell', 
    price: 10, 
    amount: 10, 
    instrument: 'eur_usd'
  },
]

function App() {
  const [tableState, setTableState] = useState(state)

  return (
    <div className="App">
      <Ticker ws={ws} placeOrder={setTableState}/>
      <OrderList state={tableState}/>
    </div>
  );
}

export default App;

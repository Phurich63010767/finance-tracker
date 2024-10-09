import React from 'react';
import { useNavigate , Route, Routes } from 'react-router-dom';
import { Button } from 'antd'; 
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';
import './App.css';

const App = () => {
  const navigate = useNavigate();

  return (
      <div>
        <div className="button-group">
          <Button className="nav-button" type="primary" onClick={() => navigate('/transactions')}>
            Transaction List
          </Button>
          <Button className="nav-button" type="primary" onClick={() => navigate('/add-transaction')}>
            Add Transaction
          </Button>
        </div>

        <Routes>
          <Route path="/" element={<TransactionList />} />
          <Route path="/transactions" element={<TransactionList />} />
          <Route path="/add-transaction" element={<AddTransaction />} />
        </Routes>
      </div>
  );
};

export default App;

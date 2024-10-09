import axios from 'axios';
import { message } from 'antd'; 

const API_URL = 'http://localhost:3000/transactions';

export const fetchTransactions = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions', error);
    throw error;
  }
};

export const createTransaction = async (values) => {
  try {
    await axios.post(API_URL, {
      description: values.description,
      amount: values.amount,
      date: values.date.format('YYYY-MM-DD'),
      type: values.type,
    });
    message.success('Transaction added successfully!');
  } catch (error) {
    console.error('Error adding transaction:', error);
    message.error('Failed to add transaction.');
  }
};

export const deleteTransaction = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (err) {
    console.error('Failed to delete transaction:', err);
  }
};

export const updateTransaction = async (values , id) => {
  const updatedTransaction = {
    ...values,
    date: values.date ? values.date.format('YYYY-MM-DD') : null, 
  };

  try {
    await axios.put(
      `${API_URL}/${id}`,
      updatedTransaction,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (err) {
    console.error('Failed to update transaction:', err);
  }
};
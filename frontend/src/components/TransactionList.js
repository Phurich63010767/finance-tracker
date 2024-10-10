import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Popconfirm, DatePicker, Select } from 'antd';
import moment from 'moment';
import { fetchTransactions, updateTransaction, deleteTransaction } from './../services/api'
import './TransactionList.css';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [form] = Form.useForm(); // สร้างฟอร์ม
  const { Option } = Select;

  // ดึงข้อมูลจาก backend เมื่อ component ถูกโหลด
  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    const response = await fetchTransactions();
    setTransactions(response);
  };

  // ฟังก์ชันเปิด modal สำหรับแก้ไข
  const handleEdit = (transaction) => {
    const transactionWithDate = {
      ...transaction,
      date: transaction.date ? moment(transaction.date) : null, // แปลงวันที่เป็น moment object
    };
    setCurrentTransaction(transactionWithDate);
    form.setFieldsValue(transactionWithDate); // ตั้งค่าให้ฟอร์มมีค่าเริ่มต้นเป็นค่าของ transaction ที่เลือก
    setIsEditing(true);
  };

  const handleUpdate = async (values, id) => {
    await updateTransaction(values, id);
    getTransactions();
    setIsEditing(false);
    setCurrentTransaction(null);
  };

  const handleDelete = async (id) => {
    await deleteTransaction(id);
    getTransactions();
  };

  const getTotalAmount = () => {
    return transactions.reduce((total, record) => total + Number(record.amount), 0);
  };

  const columns = [
    { 
      title: 'ID', 
      dataIndex: 'id', 
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      defaultSortOrder: 'ascend', 
    },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount', sorter: (a, b) => a.amount - b.amount }, // เพิ่ม sorter สำหรับ Amount
    { title: 'Date', dataIndex: 'date', key: 'date', render: (text) => new Date(text).toLocaleDateString(),
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    { title: 'Type', dataIndex: 'type', key: 'type' ,
      filters: [
      {
        text: 'Income',
        value: 'income',
      },
      {
        text: 'Expense',
        value: 'expense',
      },
    ],
    onFilter: (value, record) => record.type.indexOf(value) === 0,},
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete this transaction?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger style={{ marginLeft: 8 }}>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      <div style={{ padding: '20px' }}>
        <h2>Transaction List</h2>
        <Table
          columns={columns}
          dataSource={transactions}
          rowKey="id"
          bordered
          pagination={{ pageSize: 10 }}
          summary={() => (
            <Table.Summary.Row>
              <Table.Summary.Cell colSpan={2}>Total</Table.Summary.Cell>
              <Table.Summary.Cell>
                {getTotalAmount()} {/* แสดงผลรวม */}
              </Table.Summary.Cell>
              <Table.Summary.Cell colSpan={3}></Table.Summary.Cell>
            </Table.Summary.Row>
          )}
        />
      </div>

      <Modal
        title="Edit Transaction"
        visible={isEditing}
        onCancel={() => setIsEditing(false)}
        footer={null} // ซ่อน footer
      >
        <Form
          form={form} // กำหนดฟอร์ม
          layout="vertical"
          onFinish={(values) => { // ใช้ onFinish แทน onOk
            handleUpdate(values, currentTransaction.id); // ส่งค่าที่ได้ไปฟังก์ชันการอัปเดต
          }}
          initialValues={currentTransaction} // ตั้งค่า initialValues
        >
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input description!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: 'Please input amount!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: 'Please select the date!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: 'Please select type!' }]}
          >
            <Select placeholder="Select transaction type">
              <Option value="income">Income</Option>
              <Option value="expense">Expense</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>Save</Button> 
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TransactionList;

import { Form, Input, InputNumber, Button, Select, DatePicker } from 'antd'; 
import { createTransaction } from './../services/api'

const { Option } = Select;

const AddTransaction = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    createTransaction(values);
    form.resetFields();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Add Transaction</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ maxWidth: '400px' }}
      >
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please input the description!' }]}
        >
          <Input placeholder="Enter description" />
        </Form.Item>

        <Form.Item
          name="amount"
          label="Amount"
          rules={[{ required: true, message: 'Please input the amount!' }]}
        >
          <InputNumber placeholder="Enter amount" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: 'Please select the date!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="type"
          label="Type"
          rules={[{ required: true, message: 'Please select the transaction type!' }]}
        >
          <Select placeholder="Select transaction type">
            <Option value="income">Income</Option>
            <Option value="expense">Expense</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add Transaction
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddTransaction;

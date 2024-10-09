import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    console.log('Creating transaction:', createTransactionDto);
    const transaction = this.transactionsRepository.create(createTransactionDto);
    const savedTransaction = await this.transactionsRepository.save(transaction);
    console.log('Saved transaction:', savedTransaction); // Log ข้อมูลที่บันทึก
    return savedTransaction;
  }

  async findAll(): Promise<Transaction[]> {
    return await this.transactionsRepository.find();
  }

  async findOne(id: number): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findOne({ where: { id } });
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    return transaction;
  }

  async remove(id: number): Promise<void> {
    const result = await this.transactionsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findOne({ where: { id } });
  
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
  
    const updatedTransaction = { ...transaction, ...updateTransactionDto };
    console.log('Updated Transaction:', updatedTransaction);
    const savedTransaction = await this.transactionsRepository.save(updatedTransaction);
    console.log('Saved Transaction:', savedTransaction);
    return savedTransaction;
  }
}

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Transaction } from 'src/transactions/entities/transaction.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'phurich5',
  database: 'finance_tracker',
  entities: [Transaction],
  synchronize: true,  // ตั้งค่าให้ใช้การ synchronize กับ database
};

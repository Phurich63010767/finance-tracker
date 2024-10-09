import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsController } from './transactions/transactions.controller';
import { TransactionsService } from './transactions/transactions.service';
import { typeOrmConfig } from './config/typeorm.config'; // นำเข้าการตั้งค่า
import { Transaction } from './transactions/entities/transaction.entity'; 

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig), // ใช้การตั้งค่าจาก typeOrmConfig
    TypeOrmModule.forFeature([Transaction]), // โมเดล Transaction
  ],
  controllers: [TransactionsController], // เพิ่ม Controller
  providers: [TransactionsService], // เพิ่ม Service
})
export class AppModule {}

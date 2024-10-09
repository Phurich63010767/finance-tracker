import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;  // ID สำหรับธุรกรรมแต่ละรายการ

  @Column()
  description: string;  // คำอธิบายของธุรกรรม เช่น "ซื้อกาแฟ"

  @Column('decimal')
  amount: number;  // จำนวนเงินที่ใช้ในธุรกรรมนี้ (บวกสำหรับรายรับ ลบสำหรับรายจ่าย)

  @Column()
  date: Date;  // วันที่ทำธุรกรรม

  @Column()
  type: string;  // ประเภทของธุรกรรม: 'income' หรือ 'expense'
}

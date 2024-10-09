import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  @Get()
  getFrontend(@Res() res: Response) {
    // ส่งไฟล์ frontend (เช่น index.html) เมื่อมีการเรียก / ใน backend
    res.sendFile(join(__dirname, '..', 'frontend', 'build', 'index.html'));
  }
}

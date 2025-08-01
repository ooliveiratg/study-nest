import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';

@Controller('app')
export class AppController {
  constructor(
    private prisma : PrismaService,
    ) {
  }

  @Get('hello')
  async getHello() {
    const member = await this.prisma.member.create({
      data: {
        id: 'capitao',
        name: 'guilherme Capitão',
        function: 'Capitão do time',
      }
    })
    return {
      member,
    }
  }
}

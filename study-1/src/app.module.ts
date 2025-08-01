import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { MemberRepository } from './repository/member-repository';
import { PrismaMemberRepository } from './repository/prisma/prisma-member-repository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [PrismaService,
    {
    provide: MemberRepository,
      useClass: PrismaMemberRepository
  }],
})
export class AppModule {}

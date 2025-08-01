import { randomUUID } from 'crypto';
import { MemberRepository } from '../member-repository';
import { PrismaService } from '../../database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaMemberRepository implements  MemberRepository{
  constructor(private prisma: PrismaService) {}
  async create(name:string, memberFunction:string){
    await this.prisma.member.create({
      data: {
        id: randomUUID(),
        name,
        function: memberFunction
      }
    })
  }
}
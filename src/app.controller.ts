import { Body, Controller, Get, Injectable, Post } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { randomUUID } from 'crypto';
import { CreateMemberBody } from './dtos/create-member-body';
import { MemberRepository } from './repository/member-repository';

@Controller('app')
export class AppController {
  constructor(
   private MemberRepository: MemberRepository
    ) {
  }

  @Post('hello')
  async getHello(@Body() body: CreateMemberBody) {
    const {name,memberFunction} = body;
   await this.MemberRepository.create(name,memberFunction)

  }
}

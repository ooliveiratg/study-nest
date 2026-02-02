import { AppModule } from '../../app.module';
import { PrismaService } from '@/infra/db/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { email } from 'zod';
import bcrypt from 'bcrypt';
describe('Create Account (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    await app.init();
  });

  test('[POST] / accounts', async () => {
    const response = await request(app.getHttpServer()).post('/accounts').send({
      name: 'John',
      email: 'john@john.com',
      password: '123456',
    });
    expect(response.statusCode).toBe(201);
    const userOnDataBase = await prisma.user.findUnique({
      where: {
        email: 'john@john.com',
      },
    });
    expect(userOnDataBase).toBeTruthy();
  });

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: 'john@john.com' } });
    await app.close();
  });
});

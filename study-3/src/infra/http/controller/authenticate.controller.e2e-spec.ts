import { AppModule } from '../../app.module';
import { PrismaService } from '@/infra/db/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import bcrypt from "bcrypt"

describe('Authenticate (E2E)', () => {
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

  test('[POST] / sessions', async () => {
    await prisma.user.create({
      data: {
        name: 'John',
        email: 'john@john.com',
        password: await bcrypt.hash('123456', 8),
      },
    });
    const response = await request(app.getHttpServer()).post('/sessions').send({
      email: 'john@john.com',
      password: '123456',
    });
    expect(response.statusCode).toBe(200);
    const userOnDataBase = await prisma.user.findUnique({
      where: {
        email: 'john@john.com',
      },
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
        access_token: expect.any(String)
    })
  });
});

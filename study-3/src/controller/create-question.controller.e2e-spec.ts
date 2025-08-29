import { AppModule } from '@/app.module';
import { PrismaService } from '@/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { email } from 'zod';
describe('Create Question (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    await app.init();
  });

  test('[POST] / questions', async () => {

   const user = await prisma.user.create({
      data: {
        name: 'John',
        email: 'john@john.com',
        password: '123456',
      },
    });

    const accessToken = await jwt.sign({sub:user.id})

    const response = await request(app.getHttpServer()).post('/questions').send({
      title: 'new question',
      content:'question content'
    });
    expect(response.statusCode).toBe(201);
    const userOnDataBase = await prisma.user.findUnique({
        where:{
                title: 'new question',
        }
    })
    expect(userOnDataBase).toBeTruthy()
  });
});

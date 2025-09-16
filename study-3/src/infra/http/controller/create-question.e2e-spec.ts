import { AppModule } from '../../app.module';
import { PrismaService } from '@/infra/db/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import bcrypt from "bcryptjs";
import { ConfigService } from '@nestjs/config';
import { EnvSchema } from '@/infra/env';

describe('Create Question (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;
  let config: ConfigService<EnvSchema, true>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);
    config = moduleRef.get(ConfigService);
    await app.init();
  });

  test('[POST] /questions', async () => {
    const uniqueEmail = `john+${Date.now()}@john.com`;
    const user = await prisma.user.create({
      data: {
        name: 'John',
        email: uniqueEmail,
        password: await bcrypt.hash('123456', 8),
      },
    });

    const accessToken = jwt.sign(
      { sub: user.id },
      { secret: config.get('JWT_SECRET', { infer: true }), expiresIn: '1d' }
    );

    const response = await request(app.getHttpServer())
      .post('/questions')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'new question',
        content: 'question content',
        slug: 'new-question'
      });

    console.log(response.status, response.body);

    expect(response.status).toBe(201);

    const questionOnDataBase = await prisma.question.findFirst({
      where: {
        title: 'new question',
      },
    });
    expect(questionOnDataBase).toBeTruthy();
  });
});
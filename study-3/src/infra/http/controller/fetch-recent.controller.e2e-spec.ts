import { AppModule } from '../../app.module';
import { PrismaService } from '@/infra/db/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { EnvSchema } from '@/infra/env';

describe('Fetch recent questions (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;
  let config: ConfigService<EnvSchema, true>;

  beforeAll(async () => {
    console.log('Iniciando beforeAll');
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);
    config = moduleRef.get(ConfigService);
    await app.init();
  });

  test('[GET] /questions', async () => {
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
      { secret: config.get('JWT_SECRET', { infer: true }), expiresIn: '1d' },
    );

    await prisma.question.createMany({
      data: [
        {
          title: 'questions01',
          slug: 'question 01',
          content: 'question01',
          authorId: user.id,
        },
        {
          title: 'questions02',
          slug: 'question 02',
          content: 'question02',
          authorId: user.id,
        },
      ],
    });

    const response = await request(app.getHttpServer())
      .get('/questions')
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    console.log(response.status, response.body);

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      questions: [
        expect.objectContaining({ title: 'questions01' }),
        expect.objectContaining({ title: 'questions02' }),
      ],
    });
  });
});

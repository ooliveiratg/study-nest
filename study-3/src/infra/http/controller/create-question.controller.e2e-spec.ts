import { AppModule } from '../../app.module';
import { PrismaService } from '@/infra/db/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { config, email } from 'zod';
import bcrypt from "bcrypt"
import { ConfigService } from '@nestjs/config';
import { EnvSchema } from '@/infra/env';
describe('Create Question (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService
  let config: ConfigService<EnvSchema, true>

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);
    config = moduleRef.get(ConfigService)
    await app.init();
  });

  test('[POST] / questions', async () => {

   const user = await prisma.user.create({
      data: {
        name: 'John',
        email: 'john@john.com',
        password: await bcrypt.hash('123456', 8),
      },
    });

    const accessToken = jwt.sign({sub:user.id},{secret: config.get('JWT_SECRET',{infer:true}),expiresIn:'1d'})

     const response = await request(app.getHttpServer())
      .post('/questions')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'New question',
        content: 'Question content',
        slug: 'new-question'
      })
    expect(response.status).toBe(201);
    const userOnDataBase = await prisma.question.findFirst({
        where:{
                title: 'New question',
        }
    })
    expect(userOnDataBase).toBeTruthy()
  });
});

import { Module } from '@nestjs/common';
import { PrismaService } from './db/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config'
import { CreateAccoutController } from './http/controller/create-account.controller';
import { envSchema } from './env';
import { AuthModule } from './security/auth/auth.module';
import { AuthenticateController } from './http/controller/authenticate.controller';
import { FetchRecentQuestionsController } from './http/controller/fetch-recent-questions.controller';
import { CreateQuestionController } from './http/controller/create-question.controller';
import { HttpModule } from './http/http.module';

@Module({
  imports: [ConfigModule.forRoot({
    validate:env => envSchema.parse(env),
    isGlobal: true, 
  }),
  AuthModule,
  HttpModule
],
  providers: [ PrismaService],
})
export class AppModule {}

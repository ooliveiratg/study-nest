import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config'
import { CreateAccoutController } from './controller/create-account.controller';
import { envSchema } from './env';
import { AuthModule } from './auth/auth.module';
import { AuthenticateController } from './controller/authenticate-controller';

@Module({
  imports: [ConfigModule.forRoot({
    validate:env => envSchema.parse(env),
    isGlobal: true, 
  }),
  AuthModule
],
  controllers: [CreateAccoutController, AuthenticateController],
  providers: [ PrismaService],
})
export class AppModule {}

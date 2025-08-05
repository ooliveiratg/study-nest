import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3333, () => {
   console.log("running");
 });
 const configService = app.get(ConfigService);
  const port = configService.get('PORT', {infer: true});  

await app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;
  const config = new DocumentBuilder()
    .setTitle('test-api')
    .setDescription('test-api')
    .setVersion('1.0')
    .addTag('test')
    .setBasePath('dev')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  app.setGlobalPrefix('dev');
  await app.listen(PORT,() => {
    console.log(`App is running on port ${PORT}`);
  });
}
bootstrap();

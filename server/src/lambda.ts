import { Context, Handler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'http';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as serverless from 'aws-serverless-express';
import express from 'express';

let server: Server;

async function bootstrapServer(): Promise<Server> {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);
  app.enableCors();
  await app.init();
  return serverless.createServer(expressApp);
}

export const handler: Handler = async (event: any, context: Context) => {
  if (!server) {
    server = await bootstrapServer();
  }

  return serverless.proxy(server, event, context, 'PROMISE').promise;
};

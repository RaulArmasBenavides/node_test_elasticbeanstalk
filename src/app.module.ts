import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AwsSecretService } from './aws/aws-secret.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService,AwsSecretService],
})
export class AppModule {}

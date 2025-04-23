import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AwsSecretService } from './aws/aws-secret.service';
import { EmailService } from './email/email.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService,AwsSecretService,EmailService],
})
export class AppModule {}

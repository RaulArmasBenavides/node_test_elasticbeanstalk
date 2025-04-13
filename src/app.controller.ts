import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AwsSecretService } from './aws/aws-secret.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly awsSecretService: AwsSecretService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('secrets/db')
  async getDbConnectionString(): Promise<string> {
    const secret = await this.awsSecretService.getSecret('MY_SECRET_ID');
    return secret ?? 'Secret not found';
  }
}

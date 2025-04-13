// src/aws/aws-secret.service.ts
import { Injectable } from '@nestjs/common';
import {
  SecretsManagerClient,
  GetSecretValueCommand
} from '@aws-sdk/client-secrets-manager';

@Injectable()
export class AwsSecretService {
  private client = new SecretsManagerClient({ region: 'us-east-1' });

  async getSecret(secretName: string): Promise<any> {
    const command = new GetSecretValueCommand({ SecretId: secretName });
    const response = await this.client.send(command);
    return response.SecretString ? JSON.parse(response.SecretString) : null;
  }
}

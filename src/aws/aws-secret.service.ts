// src/aws/aws-secret.service.ts
import { Injectable } from '@nestjs/common';
import {
  SecretsManagerClient,
  GetSecretValueCommand
} from '@aws-sdk/client-secrets-manager';

@Injectable()
export class AwsSecretService {
    private client = new SecretsManagerClient({ region: 'us-east-1' });

    // 🧠 Simple cache por nombre de secreto
    private cache = new Map<string, any>();
  
    async getSecret(secretName: string): Promise<any> {
      // 1. Si ya está en caché, lo devuelvo
      if (this.cache.has(secretName)) {
        return this.cache.get(secretName);
      }
  
      // 2. Sino, lo traigo de AWS y lo guardo en caché
      const command = new GetSecretValueCommand({ SecretId: secretName });
      const response = await this.client.send(command);
      const secretValue = response.SecretString ? JSON.parse(response.SecretString) : null;
  
      if (secretValue) {
        this.cache.set(secretName, secretValue);
      }
  
      return secretValue;
    }
}

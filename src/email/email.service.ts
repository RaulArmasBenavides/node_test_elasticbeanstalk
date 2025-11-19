import { Injectable } from '@nestjs/common';
import {
  SESClient,
  SendEmailCommand,
} from '@aws-sdk/client-ses';

@Injectable()
export class EmailService {
  private readonly client = new SESClient({ region: 'us-east-1' });


  //esto para localmente
//   const ses = new SESClient({
//     region: process.env.AWS_REGION,
//     credentials: {
//       accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
//     },
//   });

  async sendEmail(to: string, subject: string, bodyHtml: string): Promise<void> {
    const command = new SendEmailCommand({
      Source: 'raul@tuvistazo.com', // 🟡 debe estar verificado
      Destination: { ToAddresses: [to] },
      Message: {
        Subject: { Data: subject },
        Body: { Html: { Data: bodyHtml } },
      },
    });

    await this.client.send(command);
  }
}
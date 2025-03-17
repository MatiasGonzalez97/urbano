import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
const { MailtrapClient } = require("mailtrap");

@Injectable()
export class EmailsService {
  async send(emailDTO: CreateEmailDto) {
    const { from, to, subject, message } = emailDTO;
    const TOKEN = process.env.EMAIL_K;
    try{
      const client = new MailtrapClient({
        token: TOKEN,
      });
      
      const sender = {
        email: "hello@matigonzalez.online",
        name: from,
      };
  
      const recipients = [
        {
          email: to,
        }
      ];
      
      const response = await client
        .send({
          from: sender,
          to: recipients,
          subject: subject,
          text: message,
          category: "Integration Test",
        }); 
      return { success: true, response: response.data || "Email enviado correctamente." };
    }catch(error) {
      return { success: false, error: error.response?.data || error.message ||  "Error desconocido"};
    }
    
  }
}
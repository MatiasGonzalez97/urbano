import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import * as FormData from 'form-data';
import Mailgun from "mailgun.js"; // mailgun.js v11.1.0
@Injectable()
export class EmailsService {

  async send(createEmailDto: CreateEmailDto) {
    const { from, to, subject, message } = createEmailDto;
    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({
      username: "api",
      key: process.env.API_KEY || "API_KEY",
    });
    try {
      const data = await mg.messages.create("sandboxb821cc50112449eb8b66fc8494520edc.mailgun.org", {
        from: from,
        to: [to],
        subject: subject,
        text: message,
      });
      return data
    } catch (error) {
      console.log(error); //logs any error
    }
  }
}
import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';

@Injectable()
export class EmailsService {
  send(createEmailDto: CreateEmailDto) {
    const {from, to, message, subject } = createEmailDto
    return  `Mensaje de ${from} a ${to} con el mensaje: ${message} y con el sujeto ${subject}`;
  }
}

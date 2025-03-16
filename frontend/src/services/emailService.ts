import axios from 'axios';

interface EmailData {
  from: string;
  subject: string;
  message: string;
}

const sendEmail = async (data: EmailData) => {
  return axios.post('api/emails/send-email', data); // Asegúrate de configurar esta ruta en tu backend
};

export default { sendEmail };

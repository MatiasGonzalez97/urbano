import { useState } from 'react';
import { Loader } from 'react-feather';
import { useForm } from 'react-hook-form';

import Layout from '../components/layout';
import emailService from '../services/emailService';

interface EmailForm {
  from: string;
  subject: string;
  message: string;
}

export default function Email() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<EmailForm>();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sendEmail = async (data: EmailForm) => {
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      await emailService.sendEmail(data);
      setSuccessMessage('Email sent successfully!');
      reset();
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error sending email');
    }
  };

  return (
    <Layout>
      <h1 className="font-semibold text-3xl mb-5 bg-brand-header p-5">
        Dejanos tu consulta!
      </h1>
      <form
        className="flex flex-col gap-5 p-5 bg-white shadow-md rounded-lg max-w-lg mx-auto"
        onSubmit={handleSubmit(sendEmail)}
      >
        <input
          type="email"
          className="input"
          placeholder="Mail"
          required
          {...register('from')}
        />
        <input
          type="text"
          className="input"
          placeholder="Asunto"
          required
          {...register('subject')}
        />
        <textarea
          className="input h-32"
          placeholder="Mensaje"
          required
          {...register('message')}
        />

        <button className="btn bg-blue-500 text-white" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader className="animate-spin mx-auto" />
          ) : (
            'Send Email'
          )}
        </button>

        {successMessage && (
          <div className="text-green-500">{successMessage}</div>
        )}
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      </form>
    </Layout>
  );
}

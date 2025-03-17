import { useState } from 'react';
import { Loader, X } from 'react-feather';
import { useForm } from 'react-hook-form';

import Layout from '../components/layout';
import Modal from '../components/shared/Modal'; // Asegúrate de importar el componente Modal
import emailService from '../services/emailService';

interface EmailForm {
  to: string;
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

  const [toEmail, setToEmail] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const confirmRecipient = () => {
    if (toEmail.trim() !== '') {
      closeModal();
    }
  };

  const sendEmail = async (data: EmailForm) => {
    if (!toEmail) {
      setErrorMessage(
        'Por favor, configura el destinatario antes de enviar el email.',
      );
      return;
    }

    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await emailService.sendEmail({ ...data, to: toEmail });
      if (response.data?.success) {
        setSuccessMessage('Email enviado con éxito!');
      } else {
        setErrorMessage(response?.data?.message || 'Error al enviar el email.');
      }
      reset();
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'Error al enviar el email.',
      );
    }
  };

  return (
    <Layout>
      <h1 className="font-semibold text-3xl mb-5 bg-brand-header p-5">
        ¡Déjanos tu consulta!
      </h1>

      {/* Botón para abrir el modal */}
      <div className="text-center mb-5">
        <button className="btn bg-gray-500 text-white" onClick={openModal}>
          Configurar destinatario
        </button>
      </div>

      {/* Muestra el email seleccionado o mensaje de alerta */}
      <div className="text-center text-gray-700 mb-5">
        {toEmail ? (
          <p>
            📩 Enviar a: <strong>{toEmail}</strong>
          </p>
        ) : (
          <p className="text-red-500">⚠ No hay destinatario configurado</p>
        )}
      </div>

      {/* Formulario principal */}
      <form
        className="flex flex-col gap-5 p-5 bg-white shadow-md rounded-lg max-w-lg mx-auto"
        onSubmit={handleSubmit(sendEmail)}
      >
        <input
          type="email"
          className="input"
          placeholder="Tu Email"
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
            'Enviar Email'
          )}
        </button>

        {successMessage && (
          <div className="text-green-500">{successMessage}</div>
        )}
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      </form>

      {/* Modal para ingresar destinatario */}
      <Modal show={modalOpen}>
        <div className="flex">
          <h2 className="font-semibold mb-3">Configurar Destinatario</h2>
          <button className="ml-auto focus:outline-none" onClick={closeModal}>
            <X size={30} />
          </button>
        </div>
        <hr />

        <div className="flex flex-col gap-4 mt-5">
          <input
            type="email"
            className="input"
            placeholder="Correo del destinatario"
            value={toEmail}
            onChange={(e) => setToEmail(e.target.value)}
            required
          />
          <button
            className="btn bg-green-500 text-white"
            onClick={confirmRecipient}
          >
            Guardar destinatario
          </button>
        </div>
      </Modal>
    </Layout>
  );
}

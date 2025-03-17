import { useState } from 'react';
import { Loader, Plus, X } from 'react-feather';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';

import CoursesTable from '../components/courses/CoursesTable';
import Layout from '../components/layout';
import Modal from '../components/shared/Modal';
import useAuth from '../hooks/useAuth';
import CreateCourseRequest from '../models/course/CreateCourseRequest';
import courseService from '../services/CourseService';

export default function Courses() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null); // Estado para la imagen

  const [addCourseShow, setAddCourseShow] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const { authenticatedUser } = useAuth();
  const { data, isLoading, refetch } = useQuery(
    ['courses', name, description],
    () =>
      courseService.findAll({
        name: name || undefined,
        description: description || undefined,
      }),
    {
      enabled: true,
    },
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<CreateCourseRequest>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setImage(event.target.files[0]);
    }
  };

  const saveCourse = async (data: CreateCourseRequest) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      if (image) {
        formData.append('image', image); // Agregar la imagen al FormData
      }

      await courseService.save(formData);
      setAddCourseShow(false);
      reset();
      setImage(null); // Resetear la imagen después de subir
      setError(null);
      refetch();
    } catch (error) {
      setError(error.response?.data?.message || 'Error al guardar el curso');
    }
  };

  return (
    <Layout>
      <h1 className="font-semibold text-3xl mb-5 bg-brand-header p-5">
        Manage Courses
      </h1>
      <hr />
      {authenticatedUser.role !== 'user' ? (
        <button
          className="btn my-5 flex gap-2 w-full sm:w-auto justify-center"
          onClick={() => setAddCourseShow(true)}
        >
          <Plus /> Add Course
        </button>
      ) : null}
      <button
        className="btn my-5 flex gap-2 w-full sm:w-auto justify-center bg-blue-500 text-white"
        onClick={() => refetch()}
      >
        Cargar Cursos
      </button>

      <CoursesTable data={data} isLoading={isLoading} refetch={refetch} />

      {/* Add Course Modal */}
      <Modal show={addCourseShow}>
        <div className="flex">
          <h1 className="font-semibold mb-3">Add Course</h1>
          <button
            className="ml-auto focus:outline-none"
            onClick={() => {
              reset();
              setAddCourseShow(false);
              setImage(null);
            }}
          >
            <X size={30} />
          </button>
        </div>
        <hr />

        <form
          className="flex flex-col gap-5 mt-5"
          onSubmit={handleSubmit(saveCourse)}
          encType="multipart/form-data"
        >
          <input
            type="text"
            className="input"
            placeholder="Name"
            disabled={isSubmitting}
            required
            {...register('name')}
          />
          <input
            type="text"
            className="input"
            placeholder="Description"
            disabled={isSubmitting}
            required
            {...register('description')}
          />
          {/* Input para subir la imagen */}
          <input
            type="file"
            className="input"
            accept="image/*"
            onChange={handleFileChange}
          />

          <button className="btn" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader className="animate-spin mx-auto" />
            ) : (
              'Save'
            )}
          </button>
          {error ? (
            <div className="text-red-500 p-3 font-semibold border rounded-md bg-red-50">
              {error}
            </div>
          ) : null}
        </form>
      </Modal>
    </Layout>
  );
}

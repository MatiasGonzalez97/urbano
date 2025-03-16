import { useState } from 'react';
import { AlertTriangle, Loader, X } from 'react-feather';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import Course from '../../models/course/Course';
import UpdateCourseRequest from '../../models/course/UpdateCourseRequest';
import courseService from '../../services/CourseService';
import Modal from '../shared/Modal';
import Table from '../shared/Table';
import TableItem from '../shared/TableItem';

interface UsersTableProps {
  data: Course[] | undefined;
  isLoading: boolean;
  refetch;
}

export default function CoursesTable({
  data = [],
  isLoading,
  refetch,
}: UsersTableProps) {
  const { authenticatedUser } = useAuth();
  const [deleteShow, setDeleteShow] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [updateShow, setUpdateShow] = useState<boolean>(false);

  // Estados para los filtros
  const [nameFilter, setNameFilter] = useState<string>('');
  const [descriptionFilter, setDescriptionFilter] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
    setValue,
  } = useForm<UpdateCourseRequest>();

  const handleDelete = async () => {
    try {
      if (!selectedCourseId) return;
      setIsDeleting(true);
      await courseService.delete(selectedCourseId);
      setDeleteShow(false);
      refetch(); // 🔄 Refresca los cursos después de eliminar
    } catch (error) {
      setError(error.response?.data?.message || 'Error deleting course');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = async (updateCourseRequest: UpdateCourseRequest) => {
    try {
      if (!selectedCourseId) return;
      await courseService.update(selectedCourseId, updateCourseRequest);
      setUpdateShow(false);
      reset();
      setError(null);
      refetch(); // 🔄 Refresca los cursos después de eliminar
    } catch (error) {
      setError(error.response?.data?.message || 'Error updating course');
    }
  };

  // Filtrar datos basados en los inputs
  const filteredData = data.filter(({ name, description, dateCreated }) => {
    const courseDate = new Date(dateCreated).toLocaleDateString('en-CA'); // Formato YYYY-MM-DD

    return (
      name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      description.toLowerCase().includes(descriptionFilter.toLowerCase()) &&
      (!dateFilter || courseDate.includes(dateFilter))
    );
  });

  return (
    <>
      <div className="table-container">
        <Table columns={['Name', 'Description', 'Created', 'Actions']}>
          {/* Filtros en la cabecera */}
          <tr>
            <TableItem>
              <input
                type="text"
                className="input w-full"
                placeholder="nombre"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
              />
            </TableItem>
            <TableItem>
              <input
                type="text"
                className="input w-full"
                placeholder="descripcion"
                value={descriptionFilter}
                onChange={(e) => setDescriptionFilter(e.target.value)}
              />
            </TableItem>
            <TableItem>
              <input
                type="date"
                className="input w-full"
                placeholder="fecha"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </TableItem>
            <TableItem children={''}></TableItem>{' '}
            {/* Columna vacía para acciones */}
          </tr>

          {isLoading
            ? null
            : filteredData.map(({ id, name, description, dateCreated }) => (
                <tr key={id}>
                  <TableItem>
                    <Link to={`/courses/${id}`}>{name}</Link>
                  </TableItem>
                  <TableItem>{description}</TableItem>
                  <TableItem>
                    {new Date(dateCreated).toLocaleDateString()}
                  </TableItem>
                  <TableItem className="text-right">
                    {['admin', 'editor'].includes(authenticatedUser.role) && (
                      <button
                        className="text-indigo-600 hover:text-indigo-900 focus:outline-none"
                        onClick={() => {
                          setSelectedCourseId(id);
                          setValue('name', name);
                          setValue('description', description);
                          setUpdateShow(true);
                        }}
                      >
                        Edit
                      </button>
                    )}
                    {authenticatedUser.role === 'admin' && (
                      <button
                        className="text-red-600 hover:text-red-900 ml-3 focus:outline-none"
                        onClick={() => {
                          setSelectedCourseId(id);
                          setDeleteShow(true);
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </TableItem>
                </tr>
              ))}
        </Table>

        {!isLoading && filteredData.length < 1 && (
          <div className="text-center my-5 text-gray-500">
            <h1>No results found</h1>
          </div>
        )}
      </div>

      {/* Delete Course Modal */}
      <Modal show={deleteShow}>
        <AlertTriangle size={30} className="text-red-500 mr-5 fixed" />
        <div className="ml-10">
          <h3 className="mb-2 font-semibold">Delete Course</h3>
          <hr />
          <p className="mt-2">
            Are you sure you want to delete this course? This action cannot be
            undone.
          </p>
        </div>
        <div className="flex flex-row gap-3 justify-end mt-5">
          <button
            className="btn"
            onClick={() => setDeleteShow(false)}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            className="btn danger"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Loader className="mx-auto animate-spin" />
            ) : (
              'Delete'
            )}
          </button>
        </div>
        {error && (
          <div className="text-red-500 p-3 font-semibold border rounded-md bg-red-50">
            {error}
          </div>
        )}
      </Modal>

      {/* Update Course Modal */}
      <Modal show={updateShow}>
        <div className="flex">
          <h1 className="font-semibold mb-3">Update Course</h1>
          <button
            className="ml-auto focus:outline-none"
            onClick={() => setUpdateShow(false)}
          >
            <X size={30} />
          </button>
        </div>
        <hr />
        <form
          className="flex flex-col gap-5 mt-5"
          onSubmit={handleSubmit(handleUpdate)}
        >
          <input
            type="text"
            className="input"
            placeholder="Name"
            required
            {...register('name')}
          />
          <input
            type="text"
            className="input"
            placeholder="Description"
            required
            {...register('description')}
          />
          <button className="btn" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader className="animate-spin mx-auto" />
            ) : (
              'Save'
            )}
          </button>
          {error && (
            <div className="text-red-500 p-3 font-semibold border rounded-md bg-red-50">
              {error}
            </div>
          )}
        </form>
      </Modal>
    </>
  );
}

import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'

const UnicornsView = ({
  unicorns,
  formData,
  setFormData,
  handleCreate,
  handleUpdate,
  handleDelete,
  editingUnicorn,
  startEdit,
  initialValues
}) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const validationSchema = Yup.object({
    name: Yup.string()
      .min(6, 'Debe tener minimo 6 caracteres')
      .max(20, 'Debe tener menos de 20 caracteres')
      .required('Nombre es obligatorio'),
    age: Yup.number()
      .required('Edad es obligatorio'),
    color: Yup.string()
      .required('Color es obligatorio'),
    power: Yup.string()
      .required('Poder es obligatorio'),
  })

  const actionBodyTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button
        label="Editar"
        icon="pi pi-pencil"
        onClick={() => startEdit(rowData)}
        style={{
          backgroundColor: '#f0ad4e',
          border: 'none',
          color: '#000',
        }}
      />
      <Button
        label="Eliminar"
        icon="pi pi-trash"
        onClick={() => handleDelete(rowData._id)}
        style={{
          backgroundColor: '#d9534f',
          border: 'none',
          color: '#fff',
        }}
      />
    </div>
  );

  console.log("initialValues", initialValues);


  return (
    <div
      className="p-6"
      style={{ backgroundColor: '#121212', minHeight: '100vh', color: '#ffffff' }}
    >
      <h2 className="text-2xl mb-8"> 🦄 Gestión de Unicornios</h2>

      {/* Formulario */}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={editingUnicorn ? handleUpdate : handleCreate}
        enableReinitialize
      >
        <Form>
          <div>
            <label>Nombre</label>
            <Field name='name' />
            <ErrorMessage name="name" component='div' />
          </div>
          <div>
            <label>Edad</label>
            <Field name='age' />
            <ErrorMessage name="age" component='div' />
          </div>
          <div>
            <label>Color</label>
            <Field name='color' />
            <ErrorMessage name="color" component='div' />
          </div>
          <div>
            <label>Poder</label>
            <Field name='power' />
            <ErrorMessage name="power" component='div' />
          </div>
          <Button style={{ color: 'white' }} label={editingUnicorn ? 'Editar unicornio' : 'Crear unicornio'} type='submit'></Button>
        </Form>
      </Formik>

       {/* Tabla */}
       <div style={{ marginTop: '2rem' }}>
        <DataTable
          value={unicorns}
          tableStyle={{ minWidth: '50rem' }}
          className="p-datatable-sm"
        >
          <Column field="name" header="Nombre" style={{ color: '#fff' }}></Column>
          <Column field="age" header="Edad"></Column>
          <Column field="color" header="Color"></Column>
          <Column field="power" header="Poder"></Column>
          <Column
            body={actionBodyTemplate}
            header="Acciones"
            style={{ width: '12rem' }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default UnicornsView;

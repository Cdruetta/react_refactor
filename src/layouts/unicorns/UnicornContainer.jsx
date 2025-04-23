import React, { useEffect, useState, useContext } from 'react';
import UnicornsView from './UnicornsView';

const API_URL = 'https://crudcrud.com/api/c347e73b032e444588115902d3267072/unicorns';

const UnicornsContainer = (getUnicorns, unicorns) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    colour: '',
    power: '',
  });
  const [editingUnicorn, setEditingUnicorn] = useState(null);

  // POST - Crear
  const handleCreate = async (values) => {
    console.log("values", values);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        getUnicorns()
      }
    } catch (err) {
      console.error('Error al crear unicornio:', err);
    }
  };

  // PUT - Actualizar
  const handleUpdate = async (values) => {

    if (!editingUnicorn) return;
    try {
      await fetch(`${API_URL}/${editingUnicorn._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      setEditingUnicorn(null);
      getUnicorns()
    } catch (err) {
      console.error('Error al actualizar unicornio:', err);
    }
  };

  // DELETE - Eliminar
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      getUnicorns()
    } catch (err) {
      console.error('Error al eliminar unicornio:', err);
    }
  };

  // Iniciar edición
  const startEdit = (unicorn) => {
    setEditingUnicorn(unicorn);
  };

  const initialValues = {
    name: editingUnicorn?.name || '',
    color: editingUnicorn?.color || '',
    age: editingUnicorn?.age || '',
    power: editingUnicorn?.power || ''
  }


  return (
    <>
      <UnicornsView
        unicorns={unicorns}
        formData={formData}
        setFormData={setFormData}
        handleCreate={handleCreate}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        editingUnicorn={editingUnicorn}
        startEdit={startEdit}
        initialValues={initialValues}
      />
    </>

  );
};

export default UnicornsContainer;

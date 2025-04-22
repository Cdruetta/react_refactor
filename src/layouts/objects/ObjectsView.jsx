import React, { useEffect, useState, useContext } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { motion } from 'framer-motion';

const API_URL = 'https://crudcrud.com/api/884d7e5200f94d2ea1c4688026a1b8d0/unicorns';

const ObjectsContainer = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    colour: '',
    power: '',
  });
  const [editingUnicorn, setEditingUnicorn] = useState(null);

  // POST - Crear
  const handleCreate = async () => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormData({ name: '', age: '', colour: '', power: '' });
      }
    } catch (err) {
      console.error('Error al crear unicornio:', err);
    }
  };

  // PUT - Actualizar
  const handleUpdate = async () => {
    if (!editingUnicorn) return;
    try {
      await fetch(`${API_URL}/${editingUnicorn._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          age: formData.age,
          colour: formData.colour,
          power: formData.power,
        }),
      });
      setEditingUnicorn(null);
      setFormData({ name: '', age: '', colour: '', power: '' });
    } catch (err) {
      console.error('Error al actualizar unicornio:', err);
    }
  };

  // DELETE - Eliminar
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Error al eliminar unicornio:', err);
    }
  };

  // Iniciar edición
  const startEdit = (unicorn) => {
    setEditingUnicorn(unicorn);
    setFormData({
      name: unicorn.name || '',
      age: unicorn.age || '',
      colour: unicorn.colour || '',
      power: unicorn.power || '',
    });
  };

  // Validación de formulario
  const isFormValid = formData.name && formData.colour && formData.age !== null && formData.power;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-4 w-11 md:w-8 lg:w-6 mx-auto"
    >
      <h2 className="text-2xl mb-8 text-center">Gestión de Unicornios</h2>

      {/* Formulario */}
      <div
        className="p-fluid grid gap-3 mb-4 surface-card p-4 border-round-lg shadow-2"
        style={{
          maxWidth: '700px', 
          margin: '0 auto' 
        }}
        
      >
        <div className="field col-12 md:col-6">
          <label htmlFor="name">Nombre</label>
          <InputText
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className={!formData.name ? 'p-invalid' : ''}
          />
          {!formData.name && <small className="p-error">El nombre es requerido.</small>}
        </div>

        <div className="field col-12 md:col-6">
          <label htmlFor="colour">Color</label>
          <InputText
            id="colour"
            name="colour"
            value={formData.colour}
            onChange={(e) => setFormData({ ...formData, colour: e.target.value })}
            required
            className={!formData.colour ? 'p-invalid' : ''}
          />
          {!formData.colour && <small className="p-error">El color es requerido.</small>}
        </div>

        <div className="field col-12 md:col-6">
          <label htmlFor="age">Edad</label>
          <InputNumber
            id="age"
            name="age"
            value={parseInt(formData.age)}
            onValueChange={(e) => setFormData({ ...formData, age: e.value })}
            required
            className={formData.age === null ? 'p-invalid' : ''}
            useGrouping={false}
          />
          {formData.age === null && <small className="p-error">La edad es requerida.</small>}
        </div>

        <div className="field col-12 md:col-6">
          <label htmlFor="power">Poder</label>
          <InputText
            id="power"
            name="power"
            value={formData.power}
            onChange={(e) => setFormData({ ...formData, power: e.target.value })}
            required
            className={!formData.power ? 'p-invalid' : ''}
          />
          {!formData.power && <small className="p-error">El poder es requerido.</small>}
        </div>

        <div className="col-12 text-center">
          <Button
            type="button"
            label={editingUnicorn ? "Actualizar Unicornio" : "Crear Unicornio"}
            icon={editingUnicorn ? "pi pi-save" : "pi pi-plus"}
            onClick={editingUnicorn ? handleUpdate : handleCreate}
            disabled={!isFormValid}
            style={{
              backgroundColor: '#00bcd4',
              border: 'none',
              color: '#000',
              fontWeight: 'bold',
              width: '100%',
              padding: '0.75rem',
              marginTop: '2rem',
            }}
          />
        </div>
      </div>

      {/* Tabla */}
      <h3 className="text-center mb-3">Lista de Unicornios</h3>
      <DataTable
        value={[] /* Agregar los datos de unicornios aquí */}
        stripedRows
        responsiveLayout="scroll"
        loading={false /* Cambiar según el estado de carga */}
      >
        <Column field="name" header="Nombre" />
        <Column field="colour" header="Color" />
        <Column field="age" header="Edad" />
        <Column field="power" header="Poder" />
        <Column
          header="Acciones"
          body={(rowData) => (
            <div className="flex gap-2">
              <Button
                label="Editar"
                icon="pi pi-pencil"
                onClick={() => startEdit(rowData)}
                style={{ backgroundColor: '#f0ad4e', border: 'none', color: '#000' }}
              />
              <Button
                label="Eliminar"
                icon="pi pi-trash"
                onClick={() => handleDelete(rowData._id)}
                style={{ backgroundColor: '#d9534f', border: 'none', color: '#fff' }}
              />
            </div>
          )}
        />
      </DataTable>

      {/* Confirm Dialog */}
      <ConfirmDialog />
    </motion.div>
  );
};

export default ObjectsContainer;

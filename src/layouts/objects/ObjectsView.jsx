import React, { useEffect, useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { motion } from 'framer-motion';

const API_URL = 'https://crudcrud.com/api/2e315fd4ca96402a89f5bdfc8a464ae3/unicorns';

const ObjectsContainer = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    colour: '',
    power: '',
  });
  const [editingUnicorn, setEditingUnicorn] = useState(null);
  const [unicorns, setUnicorns] = useState([]);
  const toast = useRef(null);

  const getUnicorns = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setUnicorns(data);
    } catch (err) {
      console.error('Error al obtener unicornios:', err);
      const localData = localStorage.getItem('unicorns');
      if (localData) {
        setUnicorns(JSON.parse(localData));
        toast.current?.show({
          severity: 'warn',
          summary: 'Conexión fallida',
          detail: 'Se cargaron datos desde localStorage',
        });
      } else {
        toast.current?.show({
          severity: 'error',
          summary: 'Error de conexión',
          detail: err.message,
        });
      }
    }
  };

  const handleCreate = async () => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const newUnicorn = await res.json();
        setUnicorns((prev) => [...prev, newUnicorn]);
        setFormData({ name: '', age: '', colour: '', power: '' });
        toast.current?.show({ severity: 'success', summary: 'Creado', detail: 'Unicornio agregado' });
      }
    } catch (err) {
      console.error('Error al crear unicornio:', err);
    }
  };

  const handleUpdate = async () => {
    if (!editingUnicorn) return;
    try {
      await fetch(`${API_URL}/${editingUnicorn._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setEditingUnicorn(null);
      setFormData({ name: '', age: '', colour: '', power: '' });
      await getUnicorns();
      toast.current?.show({ severity: 'success', summary: 'Actualizado', detail: 'Unicornio editado' });
    } catch (err) {
      console.error('Error al actualizar unicornio:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      await getUnicorns();
      toast.current?.show({ severity: 'info', summary: 'Eliminado', detail: 'Unicornio eliminado' });
    } catch (err) {
      console.error('Error al eliminar unicornio:', err);
    }
  };

  const startEdit = (unicorn) => {
    setEditingUnicorn(unicorn);
    setFormData({
      name: unicorn.name || '',
      age: unicorn.age || '',
      colour: unicorn.colour || '',
      power: unicorn.power || '',
    });
  };

  const isFormValid = formData.name && formData.colour && formData.age !== '' && formData.power;

  useEffect(() => {
    getUnicorns();
  }, []);

  useEffect(() => {
    localStorage.setItem('unicorns', JSON.stringify(unicorns));
  }, [unicorns]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-4 w-11 md:w-8 lg:w-6 mx-auto"
    >
      <Toast ref={toast} />

      <h2 className="text-2xl mb-8 text-center">Gestión de Unicornios</h2>

      {/* Formulario */}
      <div
        className="p-fluid grid gap-3 mb-4 surface-card p-4 border-round-lg shadow-2"
        style={{ maxWidth: '700px', margin: '0 auto' }}
      >
        <div className="field col-12 md:col-6">
          <label htmlFor="name">Nombre</label>
          <InputText
            id="name"
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
            value={formData.age ? parseInt(formData.age) : null}
            onValueChange={(e) => setFormData({ ...formData, age: e.value })}
            required
            className={formData.age === '' ? 'p-invalid' : ''}
            useGrouping={false}
          />
          {formData.age === '' && <small className="p-error">La edad es requerida.</small>}
        </div>

        <div className="field col-12 md:col-6">
          <label htmlFor="power">Poder</label>
          <InputText
            id="power"
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
            label={editingUnicorn ? 'Actualizar Unicornio' : 'Crear Unicornio'}
            icon={editingUnicorn ? 'pi pi-save' : 'pi pi-plus'}
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
        value={unicorns}
        stripedRows
        responsiveLayout="scroll"
        loading={false}
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

      <ConfirmDialog />
    </motion.div>
  );
};

export default ObjectsContainer;

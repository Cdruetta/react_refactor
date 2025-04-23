import React, { useEffect, useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { motion } from 'framer-motion';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './Objects.css';

const API_URL = 'https://crudcrud.com/api/c347e73b032e444588115902d3267072/unicorns';

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
    }
  };

  useEffect(() => {
    getUnicorns();
  }, []);

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

  const startEdit = (unicorn) => {
    setEditingUnicorn(unicorn);
    setFormData({
      name: unicorn.name || '',
      age: unicorn.age || '',
      colour: unicorn.colour || '',
      power: unicorn.power || '',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-4 w-11 md:w-8 lg:w-6 mx-auto"
    >
      <Toast ref={toast} />
      <h1 className="text-2xl mb-8 text-center" style={{ color: '#333' }}>Gestión de Unicornios</h1>
      {/* Formulario */}
      <div
        className="p-fluid grid gap-3 mb-4 surface-card p-4 border-round-lg shadow-2"
        style={{ maxWidth: '700px', margin: '0 auto', backgroundColor: '#fafafa' }}
      >
        <div className="field col-12 md:col-6">
          <label htmlFor="name" className="font-medium" style={{ color: '#333' }}>Nombre</label>
          <InputText
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className={!formData.name ? 'p-invalid' : ''}
            placeholder="Nombre "
          />
          {!formData.name && <small className="p-error">El nombre es requerido.</small>}
        </div>

        <div className="field col-12 md:col-6">
          <label htmlFor="colour" className="font-medium" style={{ color: '#333' }}>Color</label>
          <InputText
            id="colour"
            value={formData.colour}
            onChange={(e) => setFormData({ ...formData, colour: e.target.value })}
            required
            className={!formData.colour ? 'p-invalid' : ''}
            placeholder=" "
          />
          {!formData.colour && <small className="p-error">El color es requerido.</small>}
        </div>

        <div className="field col-12 md:col-6">
          <label htmlFor="age" className="font-medium" style={{ color: '#333' }}>Edad</label>
          <InputNumber
            value={formData.age ? parseInt(formData.age) : null}
            onValueChange={(e) => setFormData({ ...formData, age: e.value })}
            required
            className={formData.age === '' ? 'p-invalid' : ''}
            useGrouping={false}
            placeholder=" "
          />
          {formData.age === '' && <small className="p-error">La edad es requerida.</small>}
        </div>

        <div className="field col-12 md:col-6">
          <label htmlFor="power" className="font-medium" style={{ color: '#333' }}>Poder</label>
          <InputText
            value={formData.power}
            onChange={(e) => setFormData({ ...formData, power: e.target.value })}
            required
            className={!formData.power ? 'p-invalid' : ''}
            placeholder=""
          />
          {!formData.power && <small className="p-error">El poder es requerido.</small>}
        </div>

        <div className="col-12 text-center">
          <Button
            type="button"
            label={editingUnicorn ? 'Actualizar Unicornio' : 'Crear Unicornio'}
            icon={editingUnicorn ? 'pi pi-save' : 'pi pi-plus'}
            onClick={editingUnicorn ? handleCreate : handleCreate}
            disabled={!formData.name || !formData.colour || !formData.age || !formData.power}
            style={{
              backgroundColor: '#333333',
              border: 'none',
              color: '#fff',
              fontWeight: 'bold',
              width: '100%',
              padding: '0.75rem',
              marginTop: '2rem',
            }}
          />
        </div>
      </div>

      {/* Navegación */}
      <div className="text-center">
        <Link to="/unicorns">
          <Button label="Ver Lista de Unicornios" icon="pi pi-list" />
        </Link>
      </div>
    </motion.div>
  );
};

const UnicornList = () => {
  const [unicorns, setUnicorns] = useState([]);

  useEffect(() => {
    const fetchUnicorns = async () => {
      const res = await fetch(API_URL);
      const data = await res.json();
      setUnicorns(data);
    };
    fetchUnicorns();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-center">Lista de Unicornios</h1>
      <DataTable value={unicorns} stripedRows responsiveLayout="scroll">
        <Column field="name" header="Nombre" />
        <Column field="colour" header="Color" />
        <Column field="age" header="Edad" />
        <Column field="power" header="Poder" />
      </DataTable>
    </div>
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<ObjectsContainer />} />
      <Route path="/unicorns" element={<UnicornList />} />
    </Routes>
  </Router>
);

export default App;

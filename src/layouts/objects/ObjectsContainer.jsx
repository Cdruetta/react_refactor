import { useState, useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import ObjectsView from "./ObjectsView";

const ObjectsContainer = () => {
    const [formData, setFormData] = useState({
        name: "",
        color: "",
        age: "",
        power: ""
    });

    const [data, setData] = useState([]); // ✅ Estado para lista de unicornios
    const [editingId, setEditingId] = useState(null);
    const toast = useRef(null);
    const API_URL = "https://crudcrud.com/api/7e1f21274de44c6f88529281f3b40112/unicorns";

    const getObjetos = async () => {
        try {
            const response = await fetch(API_URL);
            const json = await response.json();
            setData(json);
        } catch (e) {
            toast.current?.show({
                severity: "error",
                summary: "Error al cargar",
                detail: e.message,
                life: 3000,
            });
        }
    };

    const handleCreate = async () => {
        const object = { ...formData };
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(object)
            });

            if (response.ok) {
                const saved = await response.json();
                setData((prev) => [...prev, saved]);
                toast.current?.show({ severity: "success", summary: "Creado", detail: "Objeto guardado exitosamente" });
                setFormData({ name: "", color: "", age: "", power: "" });
            } else {
                throw new Error("Error al guardar");
            }
        } catch (err) {
            toast.current?.show({ severity: "error", summary: "Error", detail: err.message });
        }
    };

    const handleUpdate = async () => {
        if (!editingId) return;
        const object = { ...formData };

        try {
            const response = await fetch(`${API_URL}/${editingId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(object)
            });

            if (response.ok) {
                toast.current?.show({ severity: "success", summary: "Actualizado", detail: "El objeto fue actualizado" });
                setEditingId(null);
                await getObjetos();
                setFormData({ name: "", color: "", age: "", power: "" });
            } else {
                throw new Error("Error al actualizar");
            }
        } catch (err) {
            toast.current?.show({ severity: "error", summary: "Error", detail: err.message });
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                toast.current?.show({ severity: "success", summary: "Eliminado", detail: `Objeto eliminado` });
                await getObjetos();
            } else {
                throw new Error("Error al eliminar");
            }
        } catch (err) {
            toast.current?.show({ severity: "error", summary: "Error al eliminar", detail: err.message });
        }
    };

    const onEditInit = (item) => {
        setFormData({
            name: item.name,
            color: item.color,
            age: item.age,
            power: item.power
        });
        setEditingId(item._id);
    };

    useEffect(() => {
        getObjetos();
    }, []);

    return (
        <>
            <Toast ref={toast} />
            <ObjectsView
                unicorns={data} // ✅ Lista de unicornios
                formData={formData}
                setFormData={setFormData}
                handleCreate={handleCreate}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                editingUnicorn={editingId} // ✅ Indicador de edición
                startEdit={onEditInit}
            />
        </>
    );
};

export default ObjectsContainer;

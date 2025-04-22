import { createContext, useState, useEffect } from "react";

// Crear el contexto
export const UnicornContext = createContext();

// El proveedor (provider) que envuelve a los componentes hijos
export const Uniprovider = ({ children }) => {
    const [unicorns, setUnicorns] = useState([]);

    const getUnicorns = async () => {
        const response = await fetch('https://crudcrud.com/api/b6c7047d3ae145a2a116bed7821e82fb/unicorns');
        const data = await response.json();
        setUnicorns(data);
    };

    useEffect(() => {
        getUnicorns();
    }, []);

    const editUnicorn = () => {
        console.log("Editar Unicornio");
    };

    return (
        <UnicornContext.Provider value={{ unicorns, getUnicorns, editUnicorn }}>
            {children}
        </UnicornContext.Provider>
    );
};

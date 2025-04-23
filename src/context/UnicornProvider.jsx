// src/context/UnicornProvider.jsx
import { useState, useEffect } from "react";
import { UnicornContext } from "./UnicornContext";

export const UnicornProvider = ({ children }) => {  // Asegúrate de que sea `export` aquí
    const [unicorns, setUnicorns] = useState([]);

    const getUnicorns = async () => {
        try {
            const response = await fetch('https://crudcrud.com/api/ee534f9f8c634bed888a6a2b7cd9b2c4/unicorns');
            const data = await response.json();
            setUnicorns(data);
        } catch (error) {
            console.error("Error al obtener los unicornios:", error);
        }
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

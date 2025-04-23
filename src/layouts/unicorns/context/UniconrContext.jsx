import { useState, useEffect } from "react";
import { UnicornContext } from "../../../context/UnicornContext";

export const Uniprovider = ({ children }) => {
    const [unicorns, setUnicorns] = useState([]);

    const getUnicorns = async () => {
        try {
        const response = await fetch("https://crudcrud.com/api/ee534f9f8c634bed888a6a2b7cd9b2c4/unicorns");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUnicorns(data);
        } catch (error) {
        console.error("Error al obtener los unicornios:", error);
        }
    };

    useEffect(() => {
        getUnicorns();
    }, []);

    return (
        <UnicornContext.Provider value={{ unicorns, getUnicorns }}>
        {children}
        </UnicornContext.Provider>
    );
};

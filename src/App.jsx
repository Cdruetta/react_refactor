import React from "react";
import ObjectsContainer from "./layouts/objects/ObjectsContainer";
import { Uniprovider } from "./context/UnicornContext";  // Asegúrate que esta ruta sea correcta

const App = () => {
  return (
    <Uniprovider>
      <ObjectsContainer />
    </Uniprovider>
  );
};

export default App;

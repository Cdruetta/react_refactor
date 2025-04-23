import React from "react";
import ObjectsContainer from "./layouts/objects/ObjectsContainer";
import { UnicornProvider } from "./context/UnicornProvider"; // Importar desde UnicornProvider

const App = () => {
  return (
    <UnicornProvider>
      <ObjectsContainer />
    </UnicornProvider>
  );
};

export default App;

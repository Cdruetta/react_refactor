import React from "react";
import ObjectsContainer from "./layouts/objects/ObjectsContainer";
import { Uniprovider } from "./context/UnicornContext"; 

const App = () => {
  return (
    <Uniprovider>
      <ObjectsContainer />
    </Uniprovider>
  );
};

export default App;

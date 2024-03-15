import React from "react";
import "./App.css";
import Home from "./views/Home";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";

function App() {
  return (
    <div className="App">
      <PrimeReactProvider>
        <Home />
      </PrimeReactProvider>
    </div>
  );
}

export default App;

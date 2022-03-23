import logo from './logo.svg';
import './App.css';
import Lista from './Components/Lista';
import Formulario from './Components/Formulario';
import { useState } from 'react';

function App() {

  const [isSubmit,setIsSubmit] = useState(null);

  const cambiarEstado = () => {
    setIsSubmit(true);
  }

  return (
    <div className="App">
      <Formulario cambiarEstado={cambiarEstado}/>
      <Lista isSubmit={isSubmit}/>
    </div>
  );
}

export default App;

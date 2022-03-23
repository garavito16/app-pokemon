import logo from './logo.svg';
import './App.css';
import Lista from './Components/Lista';
import Formulario from './Components/Formulario';
import { useState } from 'react';

function App() {

  const [ruta,setRuta] = useState(null);
  const [cantidad,setCantidad] = useState(0);

  const cambiarRuta = (ruta) => {
    setRuta(ruta);
  }

  return (
    <div className="App">
      <Formulario cambiarRuta={cambiarRuta} setCantidad={setCantidad}/>
      <Lista ruta={ruta} setRuta={setRuta} cantidad={cantidad} setCantidad={setCantidad}/>
    </div>
  );
}

export default App;

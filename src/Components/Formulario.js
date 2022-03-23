import React from "react"

const Formulario = (props) => {

    const cambiar = () => {
        props.cambiarEstado();
    }
    
    return(
        <div>
            <button onClick={cambiar}>
                Fetch Pokemon
            </button>
        </div>
    )

}

export default Formulario;
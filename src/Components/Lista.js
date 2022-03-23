import {useEffect, useState} from 'react';
import axios from 'axios';
import './Lista.css';

const Lista = (props) => {
    const [pokemon, setPokemon] = useState([]);
    const [next,setNext] = useState("");
    const [previous,setPrevious] = useState("");
    
    useEffect(() => {
        if(props.ruta != null) {
            /*
            fetch('https://pokeapi.co/api/v2/pokemon/?limit=807')
            .then(response => response.json())
            .then(response => {
                console.log(response);
                setPokemon(response.results)
            })
            */
            
            axios.get(props.ruta)
            .then(response=>{
                //llamar otra vez para traer otros datos
                let data = response.data.results;
                setNext(response.data.next);
                setPrevious(response.data.previous);
                let listaPokemon = [];
                for (let index = 0; index < data.length; index++) {
                    //console.log(data[index].url);
                    axios.get(data[index].url)
                    .then(rspta=>{
                        //console.log(rspta.data.types);
                        let img = (rspta.data.sprites.other.dream_world.front_default != null) ? 
                            rspta.data.sprites.other.dream_world.front_default : 
                            rspta.data.sprites.other.home.front_default;
                        
                        let tipos = [];
                        for (let index = 0; index < rspta.data.types.length; index++) {
                            tipos.push(rspta.data.types[index].type.name);
                        }
                        //console.log(tipos);
                        let aux = {
                            name : data[index].name,
                            imagen : img,
                            tipos : tipos
                        }

                        listaPokemon.push(aux);
                        setPokemon([...listaPokemon]);
                    });
                    
                }
                
            });
            
        }
    }, [props.ruta]);

    const cambiarRuta = (event) => {
        if(event.target.id === "next") {
            if( next != null) {
                props.setCantidad(props.cantidad+51);
                props.setRuta(next);
            }
        }
        else {
            if(previous != null) {
                props.setCantidad(props.cantidad-51);
                props.setRuta(previous);
            }
        }
    }

    return (
        <div className='container'>
            {
                pokemon.length > 0 && pokemon.map((poke, index)=>{
                    //console.log(poke);
                    return (
                        <div className="cuadradito" key={index}>
                            <div className='divNombrePokemon'>
                                <span className='nombrePokemon'>{(props.cantidad+index+1)}. {poke.name}</span>
                            </div>
                            <div>
                                <img className="imgPokemon" src={poke.imagen} alt={"imagen de "+poke.name}/>
                            </div>
                            <div className='tipos'>
                            {
                                poke.tipos.map((element,key) => {
                                    return(
                                        <div key={"tipo"+key} className='divTipo'>
                                            <span className='nombreTipo'>{element}</span>
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </div>
                    )
                })
            }
            {
                (pokemon.length > 0) ?
                <div className='divBotones'>
                    <div className='divPrevious'>
                        <button className="btnFormulario btnPrevious" id="previous" onClick={(e)=>cambiarRuta(e)}>Previous</button>
                    </div>
                    <div>
                        <button className="btnFormulario btnNext" id="next" onClick={(e)=>cambiarRuta(e)}>Next</button>
                    </div>
                </div>
                : ""
            }
            
        </div>
    );
}
export default Lista;

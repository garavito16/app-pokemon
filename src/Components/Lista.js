import {useEffect, useState} from 'react';

const Lista = (props) => {
    const [pokemon, setPokemon] = useState([]);

    
    useEffect(() => {
        if(props.isSubmit != null) {
            fetch('https://pokeapi.co/api/v2/pokemon/?limit=807')
            .then(response => response.json())
            .then(response => {
                console.log(response);
                setPokemon(response.results)
            })
        }
    }, [props.isSubmit]);

    return (
        <div>
            {
                pokemon.length > 0 && pokemon.map((poke, index)=>{
                    return (
                        <div key={index}>
                            {(index+1)}. {poke.name}
                        </div>)
                })
            }
        </div>
    );
}
export default Lista;

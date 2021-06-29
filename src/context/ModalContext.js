import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

export const ModalContext = createContext();

const ModalProvider = (props) => {
    
    const [idreceta, guardarIdReceta] = useState(null)
    const [informacion, guardarReceta] = useState({})

    useEffect(() => {
        if(!idreceta) return null;

            const obtenerReceta = async () => {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;

                const resultado = await axios.get(url);

                guardarReceta(resultado.data.drinks[0])
            }
            obtenerReceta()
    }, [idreceta])

    return ( 
        <ModalContext.Provider
            value={{
                informacion,
                guardarIdReceta,
                guardarReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>
     )
}
 
export default ModalProvider;
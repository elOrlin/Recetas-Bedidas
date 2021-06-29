import React, {useContext, useState} from 'react';
import { CategoriasContext } from '../context/CategoriasContext';
import { RecetasContext } from '../context/RecetasContext';

const Formulario = () => {

    const [busqueda, guardarBusqueda] = useState({
        nombre: '',
        categoria: ''
    })
    
    const {nombre, categoria} = busqueda;

    const [error, guardarError] = useState(false);

    const {categorias} = useContext(CategoriasContext)
    const {buscarRecetas, guardarConsultar} = useContext(RecetasContext)

    //funcion para leer los contenidos
    const obtenerDatosReceta = e => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        }) 
    }


    const buscarReceta = e => {
        e.preventDefault();

        if(nombre === '' || categoria === ''){
            guardarError(true)
            return;
        }
        
        guardarError(false)

        buscarRecetas(busqueda)

        guardarConsultar(true)
    }

    return ( 
       <form
            className="col-12"
            onSubmit={buscarReceta}
       >
          <fieldset className="text-center">
            <legend>Busca bebidas por Categoria o Ingrediente</legend>
          </fieldset>

          <div className="row">
              <div className="col-md-4">
                  <input
                    name="nombre"
                    className="form-control"
                    type="text"
                    placeholder="Busca por Ingredientes"
                    onChange={obtenerDatosReceta}
                  />
              </div>
              <div className="col-md-4">
                  <select
                    className="form-control"
                    name="categoria"
                    onChange={obtenerDatosReceta}
                  >
                      <option value="">-- Selecciona Categoria --</option>
                      {categorias.map(categoria => (
                            <option 
                                key={categoria.strCategory} 
                                value={categoria.strCategory}
                            >{categoria.strCategory}</option>
                      ))}
                  </select>
              </div>
              <div className="col-md-4">
                      <input
                        type="submit"
                        className="btn btn-block btn-primary"
                        value="Buscar Bebidas"
                      />
                  </div>
                  <div className="col-md-12">
                      {error ? <p className="error">no hay resultados intenta nuevamente</p> : null}
                  </div>
          </div>
       </form>
     );
}
 
export default Formulario;
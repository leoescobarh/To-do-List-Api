import React, { useState } from "react";
import {isEmpty, size} from 'lodash'
import Button from 'react-bootstrap/Button';

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component

	const Home = () => {
	const [lista, setlista] = useState([]);

	const agregar = add => {
    if (event.key === 'Enter' && add.target.value != "") { // agregar  mediante evento 
        setlista([...lista, add.target.value]);
    }
}
	const eliminar = (queCosa) => () =>
    setlista((lista) => lista.filter((_, i) => i !== queCosa));
	const limpiar = (e)=> { 
		e.setlista();
		for (let i = 0; i < lista.length; i++) {
		  lista[i].value='';          
		}
	  }
	return (
		
		<div className="text-center">
			<h1 className="text-center">todos</h1>
			<input
                type="text"
                placeholder="What needs to be done?"
                onKeyPress={agregar}/>

		  <div className="text-center">		 
		  <ul id="lista1" className="list-group">  
			  {lista.map((item, quecosaMap) => (
				  <li key={quecosaMap}>
					 {item}
				    <button className="btn" onClick={eliminar(quecosaMap)}>
					<i id="icono" className="fas fa-trash-alt" />
					  </button>
				  </li>
			  ))}
		  </ul>
		  <button type="reset"  onClick={limpiar}>Limpiar Campos</button>
		  <div className="restantes"> {lista.length} Restantes   </div>
	  	  </div>
	      </div>
	);
};

export default Home;

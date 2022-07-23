import React, { useState, useEffect } from "react";
import { isEmpty, size } from "lodash";
import Button from "react-bootstrap/Button";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component

const Home = () => {
  const [lista, setlista] = useState([]); //declaracion de variable "lista, " y "setlista" como funcion para eliminar o agregar
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify([]);

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://assets.breatheco.de/apis/fake/todos/user/leoescobarh",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setlista(result))
      .catch((error) => console.log("error", error));
  }, []);
  const agregar = (add) => {
    if (event.key === "Enter" && add.target.value != "") {
      // agregar  mediante apretar la tecla enter y que se agrege  add con el valor que toma siempre que sea distinto a nada
      setlista([...lista, add.target.value]); // setlista para agregar mediante la funcion... (concatenacion de lista con el valor que agregamos en el input)
    }
  };
  const eliminar = (queCosa) => () =>
    setlista((lista) => lista.filter((_, i) => i !== queCosa));

  const limpiar = () => setlista((lista) => lista.splice());
  return (
    <div className="text-center">
      <h1 className="text-center">todos</h1>
      <input
        type="text"
        placeholder="What needs to be done?"
        onKeyPress={agregar}
      />

      <div className="text-center">
        <ul id="lista1" className="list-group">
		{lista?.map((e,i) =>{
				return<li key={i}>{e.label}</li>
			})}
         
        </ul>
		
        <button className="btn" onClick={limpiar}>
          Limpiar{" "}
        </button>
        <div className="restantes"> {lista.length} Restantes </div>
      </div>
    </div>
  );
};

export default Home;

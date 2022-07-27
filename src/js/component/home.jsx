import React, { useState, useEffect } from "react";
import { isEmpty, size } from "lodash";
import Button from "react-bootstrap/Button";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component

const Home = () => {
  const [task, setTask] = useState("");

  const [editar, setEditar] = useState({index : "", label:""});

  const [list, setList] = useState([{ label: "", done: false }]);

  const handleChange = (event) => {
    setTask(event.target.value);
  };

  const getList = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/leoescobarh", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setList(
          response.map((item, index) => {
            return item; //el map siempre debe llevar un  return
          })
        );
      });
  };

  const updateList = (i) => {

    let editar = list[i];
    
    setEditar({label:editar.label, index:i})
     fetch("https://assets.breatheco.de/apis/fake/todos/user/leoescobarh", {
       method: "PUT",
       headers: {
        "content-type": "application/json",
       },
       body: JSON.stringify(list),
     })
      .then((response) => {
        console.log(response);
      })
       .catch((err) => {
       console.log(err);
       });
  };

  const handleSubmit = (event) => {
    if (task.trim() && task.length !== 0) {
      setList(list.concat({ label: task, done: false }));
    } else {
      alert("Tienes que escribir una tarea !");
    }
    console.log(list);
    setTask("");
    event.preventDefault();
  };

  const removeTodo = (index) => {
    const newTodos = [...list];
    newTodos.splice(index, 1);
    setList(newTodos);
  };

  const limpiar = () => setList((task) => task.splice());

  

  useEffect(() => {
    getList();
  }, []);
  return (
    <div className="container">
      <h1 className="title">todo list API</h1>
      
        <div>
          <input
            className="d-inline-block align-middle divInput"
            type="text"
           value={editar.label}
           onChange={e => {
        
              setEditar({index: editar.index, label: e.target.value});
           }}
            placeholder="Actualizar"
            
          />
          
          <button  onClick={updateList}  type="submit">
            Actualizar
          </button>

          <button className="btn btn-primary " type="reset">
            Cancelar
          </button>
          <br></br>
        </div>
        <br></br>
        <form onSubmit={handleSubmit}>
        <input
          className="d-inline-block align-middle divInput"
          type="text"
          value={task}
          onChange={handleChange}
          placeholder="Escriba su siguiente tarea"
        />
        <button className="btn btn-primary addTask" type="submit">
          Agregar
        </button>
      </form>
      <ul className="list-group">
        {list.map((item, index) => (
          <li className="list-group-item d-flex" key={index}>
            {item.label}

            <i onClick={removeTodo} className="far fa-trash-alt ml-auto" />


            <i onClick={()=>{updateList(index)}} className="far fa-edit" />
          </li>
          
        ))}
        <button className="btn" onClick={limpiar}>
          Limpiar{" "}
        </button>
        <div className="taskCounter">
          Tienes <strong>{list.length} tareas por hacer </strong>
        </div>
      </ul>
    </div>
  );
};

export default Home;

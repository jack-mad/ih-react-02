//que es un hook
//es una funcion nativa en react la cual puede ayudarnos a resolver un problema de datos especifico

import { useState } from 'react';

export default function Main() {
                //invocacion de useState con argumento de estado inicial ('') texto vacio
    const [nombre, setNombre] = useState({
        nombre: 'Joaquin'
    }) // => devielve [***],[()=>{}]

    const [edad, setEdad] = useState({
        edad: 27
    }) // => devielve [***],[()=>{}]

    const changeName = () => {
        setNombre({
            nombre: 'Adriana'
        })
    }
    const changeEdad = () => {
        setEdad({
            edad: 26
        })
    }

  return (
    <>
        <h1>Sección de comentarios</h1>
        <form>
            <label>Asunto</label>
            <input type="text" name="" />

            <label>Comentario</label>
            <input type="text" name="" />

            <button>Crear comentario</button>
        </form>
        <p>{nombre.nombre}</p>
        <p>{edad.edad}</p>
        <button onClick={ () => changeName() }>Cambiar nombre</button>
        <button onClick={ () => changeEdad() }>Cambiar edad</button>
    </>
  )
}

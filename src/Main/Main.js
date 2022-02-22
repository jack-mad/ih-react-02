//que es un hook
//es una funcion nativa en react la cual puede ayudarnos a resolver un problema de datos especifico

import { useState } from 'react';

export default function Main() {
    const [newComment, setNewComment] = useState({
        subject: '',
        content:'',
        author: ''
    })
    const [list,setList] = useState([])

    const [error, setError] = useState("")
    
    const handleChange = (event) => {
        console.log(event.target.value);
        console.log('hola')

        setNewComment({
            ...newComment, //spreadoperator : genera una copia de los valores que se quedaron 
            [event.target.name]: event.target.value  //referencia de propiedades [.name] - dentro del event
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault(); //detiene la recarga de pagina

        if(!newComment.subject || !newComment.content || !newComment.author) {
			setError("Existe un campo vacío. Por favor, verifica nuevamente.")
			return
		}
        
        setList([
            ...list,
            newComment
        ])
        setNewComment({
            subject: "",
            content: "",
            author: ""
        })
        setError("")
    }

  return (
    <>
        <h1>Sección de comentarios</h1>
        <form onSubmit={(evt) => {handleSubmit(evt)}}>
            <label>Asunto</label>
            <input type="text" name="subject" 
                value={newComment.subject} 
                onChange={ (evt) => handleChange(evt) }/>

            <label>Comentario</label>
            <input type="text" name="content" 
                value={newComment.content}
                onChange={ (evt) => handleChange(evt) }/>
            
            <label>Autor</label>
            <input type="text" name="author" 
                value={newComment.author}
                onChange={ (evt) => handleChange(evt) }/>
            

            <button type="submit">Crear comentario</button>

            <p>{ error }</p>

        </form>

        <h2>Listado de comentarios</h2>
        {   
            list.length === 0 ? 
                <p>No hay publicaciones</p> 
            :
            list.map((item, index) => {
                return(
                    <div key={index}>
                        <h3>{item.subject}</h3>
                        <p>{item.content}</p>
                        <small>{item.author}</small>
                    </div>
                )
            })
        }
        
    </>
  )
}

//que es un hook
//es una funcion nativa en react la cual puede ayudarnos a resolver un problema de datos especifico

import { useState } from 'react';
import { nanoid } from 'nanoid';

export default function Main() {
    const [newComment, setNewComment] = useState({
        subject: '',
        content:'',
        author: ''
    })
    const [list,setList] = useState([])

    const [error, setError] = useState("")
    const [id, setId] = useState("")
    const [editionMode, setEditionMode] = useState(false)
    
    const handleChange = (event) => {
        console.log(event.target.value);
        console.log('hola')

        setNewComment({
            ...newComment, //spreadoperator : genera una copia de los valores que se quedaron 
            id: nanoid(),
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

    const editComment = (element) => {
        setEditionMode(true)
        setNewComment({
            id: element.id,
            subject: element.subject,
            content: element.content,
            author: element.author,
        })
        setId(element.id)
    }

    const handleSubmitEdit = (event) => {

		// EVITAR LA RECARGA DE PÁGINA
		event.preventDefault()

		// VALIDACIÓN DE CAMPOS VACÍOS


		// ENCONTRAR EL ELEMENTO EN LA LISTA
		// LUEGO, MODIFICAR EL ELEMENTO DE LA LISTA
		// RETORNARLO Y GUARDARLO EN UN ARREGLO FILTRADO NUEVO

		//        A    
		// [*,*,*,AB,*]
		const filteredArray = list.map((item) => {
			return item.id === id ? {
				id: id,
				subject: newComment.subject,
				content: newComment.content,
				author: newComment.author
			} : item
		})

		console.log(filteredArray)

		setList(filteredArray)

		setEditionMode(false)

		setNewComment({
			subject: "",
			content: "",
			author: ""
		})




	}

    const deleteComment = (id) => {
        console.log(id);
        // ENCONTRAR EL ELEMENTO DENTRO DEL LISTADO Y SACARLO DE AHÍ
		//		        A
		// list => [*,*,A,*,*]
		// devolvamos la nueva lista [*,*,*,*]

		const filteredComments = list.filter((item) => {
			return item.id !== id
		})

		return setList(filteredComments)
    }

  return (
    <>
        <h1 className="text-3xl font-bold underline">Sección de comentarios</h1>
        <div className={editionMode ? "max-w-5xl mx-auto px-6 pb-6 bg-yellow-100" : "" }>
            <form onSubmit={
                editionMode ? 
                    (evt) => { handleSubmitEdit(evt) } 
                    : 
                    (evt) => { handleSubmit(evt) } 
                }>
                <label>Asunto</label>
                <input type="text" name="subject" 
                    value={newComment.subject} 
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    onChange={ (evt) => handleChange(evt) }/>
                
                <label>Comentario</label>
                <input type="text" name="content" 
                    value={newComment.content}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    onChange={ (evt) => handleChange(evt) }/>
                
                <label>Autor</label>
                <input type="text" name="author" 
                    value={newComment.author}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    onChange={ (evt) => handleChange(evt) }/>
                

                {
                    editionMode ? 
                    <button type="submit">Editar comentario</button>
                    :
                    <button type="submit">Crear comentario</button>
                }

                <p>{ error }</p>

            </form>
        </div>

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
                        <button onClick={ () => { editComment(item) }}>Editar</button>
                        <button onClick={ () => { deleteComment(item.id) }}>Borrar</button>
                    </div>
                )
            })
        }
        
    </>
  )
}

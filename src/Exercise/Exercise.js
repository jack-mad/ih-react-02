import { useState } from 'react';
import { nanoid } from 'nanoid';

export default function Exercise() {
    const [newSingle, setNewSingle] = useState({
        name: '',
        artist: '',
        album: ''
    })

    const [library, setLibrary] = useState([]);
    const [id, setId] = useState('');
    const [error, setError] = useState('')
    const [editMode, setEditMode] = useState(false)

    const handleChange = (event) => {
        setNewSingle({
            ...newSingle,
            id: nanoid(),
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!newSingle.name || !newSingle.artist || !newSingle.album) {
            setError("There's a empty field, please fill")
            return
        }

        setLibrary([
            ...library,
            newSingle
        ])
        setNewSingle({
            name: '',
            artist: '',
            album: ''
        })
        setError('')
    }

    const editSingle = (el) => {
        setEditMode(true)
        setNewSingle({
            id: el.id,
            name: el.name,
            artist: el.artist,
            album: el.album,
        })
        setId(el.id)
    }

    const handleSubmitEdit = (event) => {
        event.preventDefault()

        if (!newSingle.name || !newSingle.artist || !newSingle.album) {
            setError("There's a empty field, please fill")
            return
        }

        const filteredLibrary = library.map((item) => {
            return item.id === id ? {
                id: id,
                name: newSingle.name,
                artist: newSingle.artist,
                album: newSingle.album
            } : item
        })
        setLibrary(filteredLibrary)
        setEditMode(false)
        setNewSingle({
            name: '',
            artist: '',
            album: ''
        })
        setError('')
    }
    const deleteSingle = (id) => {
        const filteredLibrary = library.filter((item) => {
            return item.id !== id
        })
        return setLibrary(filteredLibrary)
    }

    return (
        <>
            <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 ">
                <h3 className="text-4xl my-5 font-extrabold text-slate-800 sm:text-xl sm:tracking-tight lg:text-4xl">Add Single </h3>
                <div className="max-w-xl mx-auto">
                    <form onSubmit={
                        editMode ?
                            (evt) => { handleSubmitEdit(evt) }
                            :
                            (evt) => { handleSubmit(evt) }
                    }>
                        <div className="isolate -space-y-px rounded-md shadow-sm">
                            <div className="relative border border-gray-300 rounded-md rounded-b-none px-3 py-2 ">
                                <label for="name" className="block text-xs font-medium text-gray-700">Name</label>
                                <input type="text" name="name" className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm" placeholder="Get lucky" onChange={(evt) => handleChange(evt)} value={newSingle.name} />
                            </div>
                            <div className="relative border border-gray-300 px-3 py-2 ">
                                <label for="job-title" className="block w-full text-xs font-medium text-gray-700">Artist</label>
                                <input type="text" name="artist" className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm" placeholder="Daft punk" onChange={(evt) => handleChange(evt)} value={newSingle.artist} />
                            </div>
                            <div className="relative border  border-gray-300 rounded-md rounded-t-none px-3 py-2 ">
                                <label for="job-title" className="block w-full text-xs font-medium text-gray-700">Album</label>
                                <input type="text" name="album" className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm" placeholder="Random Access Memories" onChange={(evt) => handleChange(evt)} value={newSingle.album} />
                            </div>
                        </div>
                        {
                            error ? 
                                <div className="mt-3 rounded-md bg-yellow-50 p-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                                        </svg>
                                        </div>
                                        <div className="ml-3">
                                        <h3 className="text-sm font-medium text-yellow-800">{ error }</h3>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div></div>
                        }
                        {
                            editMode ?
                                <button type="submit" className="block w-full mt-3 px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Edit Single</button>
                                :
                                <button type="submit" className="block w-full mt-3 px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >Add to library</button>
                        }

                    </form>
                </div>

                <h3 className="text-4xl my-5 font-extrabold text-slate-800 sm:text-xl sm:tracking-tight lg:text-4xl">Library</h3>
                {
                    library.length === 0 ?
                    <p>There's not singles</p>
                    :
                    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                        {
                        library.map((item, index) => {
                            return (
                                <>
                                <div key={index}>
                                    <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
                                        <div className="flex-1 flex flex-col p-8">
                                            
                                            <h3 className="text-indigo-700 text-sm font-medium">{item.name}</h3>
                                            <dl className="mt-1 flex-grow flex flex-col justify-between">
                                                <dd className="text-gray-900 text-sm">{item.artist}</dd>
                                                <dd className="text-gray-500 text-sm">{item.album}</dd>
                                            </dl>
                                        </div>
                                        <div>
                                            <div className="h-10 flex divide-x divide-gray-200">
                                                <div className="w-0 flex-1 flex justify-center bg-yellow-200">
                                                    <button onClick={() => { editSingle(item) }}>Edit</button>
                                                </div>
                                                <div className="-ml-px w-0 flex-1 flex justify-center bg-red-200">
                                                    <button onClick={() => { deleteSingle(item.id) }}>Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </div>
                                </>
                            )
                        })
                    }
                    </ul>
                }   
            </div>
        </>
    )
}

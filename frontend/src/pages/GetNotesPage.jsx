import React, { useEffect } from 'react'
import { NavLink} from 'react-router';
import { SquarePen, Trash } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { CirclePlus } from 'lucide-react';

const GetNotesPage = () => {
  const [notes, setNotes] = React.useState([])
  const [tooManyRequestsStatus, setTooManyRequestsStatus] = React.useState(false)

  const getAllNotes = async () => {
    try {
      const res = await api.get("/")
      if(res.status === 429){
        setTooManyRequestsStatus(true)
      }
      if (!Array.isArray(res.data)) {
        throw new Error('Expected the notes API to return an array')
      }
      setNotes(res.data)
    } catch (error) {
      console.error('getAllNotes error', error)
      if(error.response && error.response.status === 429) {
        setTooManyRequestsStatus(true)
      } else {
        toast.error('Unable to load notes. Please try again later.')
      }
    }
  }

  useEffect(() => { 
    getAllNotes()
  }, [])

  const handleDelete = async (id) => {
    try{
      const res = await api.delete(`/${id}`)
      if(res.status === 200) {
        toast.success('Note deleted successfully')
        getAllNotes()
      }
    }catch(error){
      console.log('handleDelete error', error)
    }
  }
  return (
    <div className='container mx-auto'>
      <div className="flex justify-between items-center mb-4">  
        <NavLink to="/"><button className='btn btn-outline bg-blue-400'>Home</button></NavLink>
      <NavLink to="/create"><button className='btn btn-outline bg-purple-400'><CirclePlus /> Add Note</button></NavLink>
      </div>
      
      {tooManyRequestsStatus ? 
      <div className="card-body">
        <h2 className="card-title">Requests Limit Exceeded</h2>
        <p>You have made too many request in short period. please try again later.</p>
      </div> : 
      <>
      <p className="text-2xl font-bold">Notes</p>
      <ul className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <li key={note._id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{note.title}</h2>
              <p>{note.content}</p>
              <div className="card-actions justify-end">
                <NavLink to={`/note/${note._id}`}><button className="btn btn-primary"><SquarePen /></button></NavLink>
                <button className="btn btn-danger" onClick={() => handleDelete(note._id)}><Trash /></button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      </>}
    </div>
  )
}

export default GetNotesPage
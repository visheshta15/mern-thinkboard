import React, {useEffect} from 'react'
import { NavLink , useParams } from 'react-router'
import api from '../utils/api'
import toast from 'react-hot-toast'

const UpdatePage = () => {
  const id = useParams().id
  const [note, setNote] = React.useState({title: '', content: ''})

  console.log('id', id)
  useEffect(() => {
    const getNoteById = async () => {
      try {   
        const res = await api.get(`/${id}`)
        setNote(res.data)
      } catch (error) {
        console.log('getNoteById error', error)
      }
    }
    if(id){
      getNoteById()
    }
  }, [id])

  const handleUpdate = async(e) => {
    e.preventDefault()
    try {
      const res = await api.put(`/${id}`, note)
    if(res.status === 201) {
        toast.success('Note updated successfully')
    }
    } catch (error) {
      console.log('handleUpdate error', error)
    }
  }

  const handleCreate = async(e) => {
    e.preventDefault()
    try {
      const res = await api.post(`/`, note)
      if(res.status === 201) {
        toast.success('Note created successfully')
      }
    } catch (error) {
      console.log('handleCreate error', error)
    }
  }

  return (
    <div>
      <NavLink to="/notes"><button className='btn btn-outline bg-orange-400'> View all Notes</button></NavLink>
      <form action="">
        <div className="form-control w-full max-w-xs"></div>
        <label className="label">
          <span className="label-text">Title</span>
        </label>
        <input type="text" placeholder="Type here" className="input input-bordered" value={note.title} onChange={(e) => setNote((prev)=> ({...prev, title: e.target.value}))}/>
        <label className="label">
          <span className="label-text">Content</span>
        </label>
        <input type="text" placeholder="Type here" className="input input-bordered" value={note.content} onChange={(e) => setNote((prev)=> ({...prev, content: e.target.value}))}/>
        {id ? <button className='btn btn-outline bg-green-400' onClick={handleUpdate}>Update</button> : <button className='btn btn-outline bg-green-400' onClick={handleCreate}>Create</button>}

      </form>
    </div>
  )
}

export default UpdatePage
import React, { useState } from 'react'
import axios from "axios"

function ChatGroups() {
    const [visible,setVisible]=useState(false)
    const [groupname,setGroupname]=useState('')

    const formToggle=()=>{
        setVisible((preState)=>!preState)
    }

    const submitHandler=async(e)=>{
        e.preventDefalut()
        try{
            const response=await axios.post("http://localhost:3000/creategroup",{
                groupname
            },{headers:{Authorization: localStorage.getItem("token"),}})
        }catch(err){
            console.log(err)
        }
    }
  return (
    <div className='flex'>
    <button
      className="bg-blue-500 mb-2 text-white px-4 py-0 rounded mt-5 ml-2"
      onClick={formToggle}
    >
      Create Group
    </button>
    {visible && (
      <form onSubmit={submitHandler} className='mt-5 ml-2'>
        <input
          type="text"
          className="flex-grow mr-2 mb-2 p-2 border border-gray-300 rounded"
          placeholder="Type Group Name..."
          onChange={(e)=>{setGroupname(e.target.value)}}
          required
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          type="submit"
        >
          Add
        </button>
      </form>
    )}
  </div>
  )
}

export default ChatGroups

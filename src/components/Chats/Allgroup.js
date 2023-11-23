import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { authActions } from "../../store/AuthReducer"
import { useDispatch } from 'react-redux'
function Allgroup() {
    const token=localStorage.getItem("token")
    const [data,setdata]=useState([])
    const dispatch=useDispatch()
   useEffect(()=>{
    if(token){
        dispatch(authActions.islogin(token))
      }
      fetchData()
   },[])
    const fetchData=async()=>{
        try{
        const response=await axios.get("http://localhost:3000/getallgroup")
        console.log(response.data.data)
        setdata(response.data.data)
        }catch(err){
            console.log(err,"error dueing fetch allgroups")
        }
    }
  return (
    <div>
    <button onClick={fetchData} className='font-bold text-xl text-blue-800 ml-4'>Allgroups</button>
    <ul className='mt-3'>
      {data.map((item, index) => (
        <p key={index} className='mr-5 mt-4'>
          {index + 1}
          <span key={item.id} className='ml-2 mt-2'>{item.groupName}</span><span>--from--{item.userName}</span>
        </p>
      ))}
    </ul>
  </div>
  )
}

export default Allgroup

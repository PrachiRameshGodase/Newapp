import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authActions } from "../store/AuthReducer";
import ChatGroups from "./ChatGroups";
import io from "socket.io-client"
const socket=io("http://localhost:3000")

function ChatUi() {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const [message, setMessage] = useState("");
  const [chatData, setchatData] = useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();


useEffect(()=>{
  if(token){
    dispatch(authActions.islogin(token))
  }
  fetchData()
  
  //new messages from the server
  socket.on("newMessage",(newMessage)=>{
    console.log(newMessage)
    setchatData((prevdata)=>[...prevdata,newMessage])
  })
  return ()=>{
    socket.off("newMessage") //remove it like cleanup function it works
  }
},[])

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3000/chats", {
      headers: {
        Authorization: token,
      },
    });
    console.log("response", response);
    setchatData(response.data.data);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
  
    if(message.trim()!==""){
      socket.emit("sendMessage",{message,userId})
      setMessage("")
    }
  };

  return (
    <div className="h-screen  ">
      {/* <ChatGroups/> */}
      <div className="rounded-sm mt-3">
        {chatData &&
          chatData.map((item) => (
            <div key={item.id} className="mb-2">
              <p className="font-semibold bg-gray-100 border p-3  ml-60 mr-60 rounded-lg ">
                {item.user.name}: {item.message}
              </p>
            </div>
          ))}
      </div>
     <div className="flex">
     <ChatGroups className=''/>
     <form onSubmit={submitHandler} className=" ml-96 mt-4 ">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border border-gray-400 p-2 mr-2 px-52 mb-4 rounded-lg"
          placeholder="Type message here..."
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 px-4 rounded-lg text-lg"
        >
          Send
        </button>
      </form>
    
     </div>

     
    </div>
  );
}

export default ChatUi;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authActions } from "../store/AuthReducer";

function ChatUi() {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const [message, setMessage] = useState("");
  const [chatData, setchatData] = useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
    dispatch(authActions.islogin(token));
    const interValidId = setInterval(() => {
      fetchData();
    }, 1000);

    return () => {
      clearInterval(interValidId);
    };
  }, []);

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
    console.log(message);
    try {
      const response = await axios.post(
        "http://localhost:3000/chats",
        { message },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setMessage('')
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen ">
      <div className="rounded-sm mt-3">
        {chatData &&
          chatData.map((item) => (
            <p key={item.id} className="mb-2">
              <p className="font-semibold bg-gray-100 border p-3  ml-60 mr-60 rounded-lg ">
                {item.user.name}: {item.message}
              </p>
            </p>
          ))}
      </div>

      <form onSubmit={submitHandler} className="mt-4 ml-96 ">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border border-gray-400 p-2 mr-2 px-52 mb-4 rounded-lg"
          placeholder="Type message here..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 px-4 rounded-lg text-lg"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatUi;

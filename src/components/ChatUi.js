import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function ChatUi() {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const [message, setMessage] = useState('');
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(message);
    try {
      const response = await axios.post(
        'http://localhost:3000/chats',
        { message },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatUi;

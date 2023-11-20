import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AuthForm() {
  const [isSignup, setIsSignup] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigate=useNavigate()

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(name, email, phone, password);
    try {
      if (isSignup) {
        const response = await axios.post("http://localhost:3000/signup", {
          name,
          email,
          phonenumber: phone,
          password,
        });
        navigate("/chat")
        console.log(response);
      } else {
        const response = await axios.post("http://localhost:3000/login", {
          email,
          password,
        });
        navigate("/chat")
        console.log(response);
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-200 to-pink-400">
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          {isSignup ? "Sign Up" : "Sign In"}
        </h2>
        <form onSubmit={submitHandler}>
          {isSignup && (
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-gray-800">
                Name:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-gray-800">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-gray-800">
              Phone:
            </label>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-gray-800">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            <Link to='/chat'>{isSignup ? "Sign Up" : "Sign In"}</Link>
            
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600 text-center">
          {isSignup
            ? "Already have an account?"
            : "Don't have an account yet?"}
          <button
            className="text-blue-500 ml-1 focus:outline-none hover:text-yellow-500"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}

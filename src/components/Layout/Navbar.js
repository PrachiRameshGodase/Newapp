import React, { useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "../../components/Layout/Navbar.module.css"
import { Link } from "react-router-dom";
import { authActions } from "../../store/AuthReducer"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { Avatar,Tooltip } from '@mui/material';

function Navbar() {
    const [isHovered, setIsHovered] = useState(false);
    const [isBouncing, setIsBouncing] = useState(true);
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const token=localStorage.getItem('token')
    console.log(token,"token from navbar")
    const enteredEmail=localStorage.getItem('email')
    const navigate = useNavigate();


    const toggleAvtar=()=>{
        setIsHovered((prevValue) => !prevValue);
      }

      

      const logOutHandler=()=>{
        dispatch(authActions.islogout())
        navigate("/")
      }

      const AdminGroupHandler=()=>{
        navigate("/admingroups")
        setIsBouncing(false)
      }

      const groupsHandler=()=>{
        navigate("/allgroups")
        setIsBouncing(false)
      }
    
  return (
    <div>
      <nav className="p-3  bg-gradient-to-b from-blue-900 to-purple-400 items-center">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 className={`mr-8 text-gray-100 font-bold ${classes.logo}  `}>
        
          Group Chat App
        </h1>

        <div className="flex">
          {!isAuth && (
            <Link to="/">
              <button className='bg-gradient-to-b from-red-600 via-red-500 to-red-800  hover:bg-purple-600 py-2 px-4 font-bold text-white rounded'>LOGIN</button>
            </Link>
          )}
          {isAuth && (
              <Tooltip
                title={enteredEmail}
                placement="bottom"
                open={isHovered}
                onClose={() => setIsHovered(false)}
                onOpen={() => setIsHovered(true)}
              >
                <Avatar
                className="bg-gradient-to-b from-yellow-200 to-pink-600 mr-3"
              style={{ marginRight: "10px", cursor: "pointer"}}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={toggleAvtar}
                >
                  {!isHovered ? (
                    <span className={classes.avatarText}>
                      {enteredEmail && <Avatar className="bg-gradient-to-b from-yellow-200 to-pink-700 " />}
                    </span>
                  ) : (
                    <span>
                      {enteredEmail && enteredEmail.charAt(0).toUpperCase()}
                    </span>
                  )}
                </Avatar>
              </Tooltip>
            )}
             {isAuth && (<button
          className={`bg-gradient-to-r from-red-600 via-green-500 to-red-600 py-2 px-4 font-bold text-white rounded hover:bg-red-800  ${
            isBouncing ? classes.bouncing : ''
          }`}
           onClick={groupsHandler}
          >Groups</button>)}
         
          {isAuth && (<button
          className={`bg-gradient-to-r from-red-600 via-green-500 to-red-600 py-2 px-4 font-bold text-white rounded hover:bg-red-800 ml-5 ${
            isBouncing ? classes.bouncing : ''
          }`}
           onClick={AdminGroupHandler}
          >Admin Groups</button>)}
          {isAuth && (
            <button
              className='bg-gradient-to-b from-red-600 via-red-500 to-red-800  hover:bg-purple-600 py-2 px-4 font-bold text-white rounded mx-5 '
              onClick={logOutHandler}
            >
              LOGOUT
            </button>
          )}
        </div>
      </div>
    </nav>
    </div>
  )
}

export default Navbar

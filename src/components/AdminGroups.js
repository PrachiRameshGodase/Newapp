import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/AuthReducer";

function AdminGroups() {
  const dispatch = useDispatch();
  const [groupName, setGroupname] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [phonenumber, setPhoneNumber] = useState("");
  const token = localStorage.getItem("token");
  const [member, setmember] = useState([]);
  const fetchData = async () => {
    const response = await axios.get("http://localhost:3000/admingroups", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    console.log(response, "admaindatafetched");
    console.log(response.data.data);
    setGroupname(response.data.data);
  };

  useEffect(() => {
    dispatch(authActions.islogin(token));
    fetchData();
  }, []);

  

  const handleGroupClick = (group) => {
    setSelectedGroup(group.groupname);
    console.log(group.groupname);
    setSelectedGroupId(group.id);
    console.log(group.id);
  };

  // const handleSubmitPhoneNumber=async(e)=>{
  //   e.preventDefault()
  //   try{
  //     const response=await axios.post("http://localhost:3000/addmember",{
  //       phoneNumber,
  //       groupId:selectedGroupId
  //     },{
  //       headers:{
  //         Authorization:token
  //       }
  //     })
  //     console.log(response.data)
  //     selectedGroup(null)
  //     selectedGroupId(null)
  //     setPhoneNumber("")
  //   }catch(err){
  //     console.log(err)
  //   }
  // }
  const handleSubmitPhoneNumber = async (event) => {
    event.preventDefault();
    try {
      // Send both phone number and group ID to the backend
      const response = await axios.post(
        "http://localhost:3000/addmember",
        {
          phonenumber,
          groupId: selectedGroupId, // Send the selected group's ID
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);

      // Reset state
      setSelectedGroup(null);
      setSelectedGroupId(null);
      setPhoneNumber("");
      alert(response.data.message);
    } catch (error) {
      console.error(error.response.data); // Log the error respons
      console.error(error);
    }
  };

  return (
    <div>
      <ul>
        {/* {groupName && groupName.map((item) => (
          <li
            key={item.id}
            onClick={() => handleGroupClick(item)}
            className="cursor-pointer hover:bg-gray-100 p-2"
          >
            {item.groupname}
            {selectedGroup && (
              <div className="mt-2">
                <h2>
                  Enter Phone Number for {selectedGroup}
                </h2>
                <form onSubmit={handleSubmitPhoneNumber}>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter phone number..."
                    className="border border-gray-300 p-2 rounded"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
                  >
                    Submit
                  </button>
                </form>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div> */}
        {groupName &&
          groupName.map((item) => (
            <li
              key={item.id}
              onClick={() => handleGroupClick(item)}
              className="cursor-pointer hover:bg-gray-100 p-2"
            >
              {item.groupname}
            </li>
          ))}
      </ul>

      {selectedGroup && (
        <div className="mt-4">
          <h2>{member}</h2>
          <h2 className="text-lg font-semibold">
            Enter Phone Number for {selectedGroup}
          </h2>
          <form onSubmit={handleSubmitPhoneNumber} className="mt-2">
            <input
              type="text"
              value={phonenumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter phone number..."
              className="border border-gray-300 p-2 rounded"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AdminGroups;

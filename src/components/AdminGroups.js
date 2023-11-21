import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/AuthReducer';


function AdminGroups() {
    const dispatch = useDispatch();
  const [groupName, setGroupname] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const token = localStorage.getItem('token');

  const fetchData = async () => {
    // const response = await axios.get("http://localhost:3000/admingroups", {
    //   headers: {
    //     Authorization: localStorage.getItem("token"),
    //   },
    // });
    // console.log(response.data.data);
    // setGroupname(response.data.data);
  };

  useEffect(() => {
    dispatch(authActions.islogin(token));
    fetchData();
  }, []);

  const handleGroupClick = (groupname) => {
    if (selectedGroup === groupname) {
      setSelectedGroup(null); // If the clicked group is already open, close it
    } else {
      setSelectedGroup(groupname); // Otherwise, set the selected group to the clicked group
    }
  };

  const handleSubmitPhoneNumber=()=>{

  }
  return (
    <div>
      <ul>
        {groupName && groupName.map((item) => (
          <li
            key={item.id}
            onClick={() => handleGroupClick(item.groupname)}
            className="cursor-pointer hover:bg-gray-100 p-2"
          >
            {item.groupname}
            {selectedGroup === item.groupname && (
              <div className="mt-2">
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
    </div>
  )
}

export default AdminGroups

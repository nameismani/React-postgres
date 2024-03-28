import React from "react";
import { Avatar } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, signoutSuccess } from "../redux/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// axios.defaults.withCredentials = true;

const Header = () => {
  //localhost:8000/images/avatar.png
  const { currentUser } = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const USERS_URL = "http://localhost:8000/api/auth/logout";
  const handleLogOut = async () => {
    try {
      const response = await axios.post(USERS_URL);
      // console.log(response.success);
      if (response.data.success) {
        dispatch(signoutSuccess());
        localStorage.removeItem("user");
        navigate("/sign-in");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  http: return (
    <div>
      Header
      {currentUser && (
        <div>
          <Avatar src={`http://localhost:8000/images/${currentUser.profile}`} />
          <button onClick={handleLogOut}>logout</button>
        </div>
      )}
    </div>
  );
};

export default Header;

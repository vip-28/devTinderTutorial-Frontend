/* eslint-disable no-unused-vars */
import { Link, Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { BASE_URL } from "../Utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.cart);
  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
    if (userData) {
      navigate("/login")
      
    } 
    
  }, [userData]);
  
    return (
      <div>
        <NavBar />
        <div className="relative">
          {" "}
          <Outlet />
        </div>

        <div className="bottom-0 relative">
          <Footer />
        </div>
      </div>
    );
  
};

export default Body;

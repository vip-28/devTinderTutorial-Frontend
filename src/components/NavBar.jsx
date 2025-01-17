import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../Utils/userSlice";
import { removeFeed } from "../Utils/feedSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../Utils/constants";

const NavBar = () => {
  const user = useSelector((store) => store.user.items);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(removeUser());
    dispatch(removeFeed());
    try {
      const res = await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      console.log(res.data);
      return navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="navbar bg-base-300">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            🔥DevTinder
          </Link>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>

          <Link to="/premium">
            <button className="btn btn-outline btn-warning ">Premium</button>
          </Link>
          {user[0]?.role ? (
            <Link to="/admin">
              <div>
                <div className=""><button className="btn btn-outline">Admin</button></div>
              </div>
            </Link>
          ) : (
            <div></div>
          )}

          <div className="dropdown dropdown-end mx-5">
            {user[0]?.firstName && (
              <div className="flex items-center">
                <p className="px-3">Welcome, {user[0]?.firstName}</p>
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <>
                    <div className="w-10 rounded-full ">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src={user[0]?.photoUrl}
                      />
                    </div>
                  </>
                </div>
              </div>
            )}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/user/connections">Connections</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
              <li>
                <Link to="/user/viewRequest">Requests</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

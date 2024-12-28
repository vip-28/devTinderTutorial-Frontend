import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Utils/constants";
const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState();

  const dispatch = useDispatch();

const [page,setPage]= useState(true);

  const [error,setError]= useState("");

  const navigate= useNavigate();
  const handleLogin = async () => {
   
    try {
      const res = await axios.post(BASE_URL+"/login", {
        emailId,
        password,
      },
    {
      withCredentials:true
    });
    console.log(res.data);
    dispatch(addUser(res.data)); // adding to store 
    return navigate("/");

    } catch (err) {
      setError(err?.response?.data);
      console.error(err);
    }
  };

  const handleSignUp = async () => {
   
    try {
      const res = await axios.post(BASE_URL+"/signup", {
        firstName,
        lastName,
        emailId,
        password,
        gender,
        age
      },
    {
      withCredentials:true
    });
    console.log(res.data);
    // dispatch(addUser(res.data)); // adding to store 
    handleLogin;

    } catch (err) {
      setError(err?.response?.data);
      console.error(err);
    }
  };


if(page){
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 text-neutral-content h-[530px] w-96">
        <div className="card-body items-center text-center">
          <h2 className="card-title mb-16">Login</h2>
          <div className="">
            <label className="form-control w-full my-2">
              <div className="label">
                <span className="label-text">EmailId</span>
              </div>
              <input
                type="text"
                placeholder="Enter your Email Id"
                className="input input-bordered w-full max-w-xs"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>

            <label className="form-control w-full my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="text"
                placeholder="Enter your Password"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            
          </div>
          <div>
        <p className="cursor-pointer" onClick={()=>setPage(!page)}>Not Registered? Sign Up</p>
      </div>
          <p className="text-red-500 mb-2">{error}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>

          </div>
          
        </div>
      </div>
    
    </div>
  );}
  else{
    return(
      <div className="flex justify-center my-10 ">
      <div className="card bg-base-300 text-neutral-content h-[540px] w-96">
        <div className="card-body items-center text-center">
          <h2 className="card-title ">Login</h2>
          <div className="">
            <label className="form-control ">
              <div className="label">
                <span className="label-text">EmailId</span>
              </div>
              <input
                type="text"
                placeholder="Enter your Email Id"
                className="input input-bordered w-full max-w-xs"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>

            <label className="form-control w-full my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="text"
                placeholder="Enter your Password"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label className="form-control w-full my-2">
              <div className="label">
                <span className="label-text">First Name</span>
                <span className="label-text">Last Name</span>

              </div>
              <div className="flex gap-4">
              <input
                type="text"
                placeholder="Enter your First Name"
                className="input input-bordered w-full"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter your Last Name"
                className="input input-bordered w-full"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              </div>
            </label>
            <label className="form-control w-full my-2">
              <div className="label">
                <span className="label-text">Age</span>
                <span className="label-text">Gender</span>

              </div>
              <div className="flex gap-4">
              <input
                type="text"
                placeholder="Enter your Age"
                className="input input-bordered w-full"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter your Gender"
                className="input input-bordered w-full"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
              </div>
            </label>

          </div>
          <div>
        <p className="cursor-pointer" onClick={()=>setPage(!page)}>Registered? Log In  </p>
      </div>
          <p className="text-red-500 ">{error}</p>
          <div className="card-actions justify-end">
          
            <button className="btn btn-primary" onClick={handleSignUp}>Signup</button>
          </div>
        </div>
      </div>
    </div>
    )
  }
};

export default Login;

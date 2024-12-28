import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../Utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";

const EditProfile = ({ user }) => {

  const [change, setChange]= useState(true);
  // const {fName, lName, aAge,gGender,aAbout,pPhotoUrl}= user;
  console.log(user);

  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age);
  const [gender, setGender] = useState(user?.gender);
  const [about, setAbout] = useState(user?.about);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  function settingup() {
    setFirstName(user?.firstName);
    setLastName(user?.lastName);
    setAge(user?.age);
    setGender(user?.gender);
    setAbout(user?.about);
    setPhotoUrl(user?.photoUrl);
  }

  useEffect(() => {
    settingup();
  }, [user]);

  const saveProfile = async () => {
    try {
    if(firstName){

      const res = await axios.patch(
        BASE_URL + "/profile/edit",
   
        { firstName, lastName, age, gender, about, photoUrl },
        { withCredentials: true }

      );
      console.log(res);
      dispatch(addUser(res?.data?.data))
      setChange(!change);
    }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex justify-center ">
      <div className={`card bg-base-300 text-neutral-content w-96 my-2  `}>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Profile Details</h2>
          <div className="">
            <div className="my-2">
              <label className="form-control h-16 ">
                <div className="label">
                  <span className="label-text">First Name</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered h-16"
                  value={firstName || ""}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
            </div>
            <div className="my-2">
              <label className="form-control h-16 ">
                <div className="label">
                  <span className="label-text">Last Name</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered h-16"
                  value={lastName || ""}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </div>
            <div className="my-2">
              <label className="form-control h-16 ">
                <div className="label">
                  <span className="label-text">Age</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered h-16"
                  value={age || ""}
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>
            </div>
            <div className="my-2">
              <label className="form-control h-16 ">
                <div className="label">
                  <span className="label-text">Gender</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered h-16"
                  value={gender || ""}
                  onChange={(e) => setGender(e.target.value)}
                />
              </label>
            </div>
            <div className="my-2">
              <label className="form-control h-16 ">
                <div className="label">
                  <span className="label-text">About</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered h-16"
                  value={about || ""}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </label>
            </div>
            <div className="my-2">
              <label className="form-control h-16 ">
                <div className="label">
                  <span className="label-text">Photo URL</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered h-16"
                  value={photoUrl || ""}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </label>
            </div>
          </div>

          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={saveProfile}>Change Data</button>
          </div>
        </div>
      </div>
      <div className="mt-8 ml-6">
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>
    </div>
  );
};

export default EditProfile;

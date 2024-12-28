import EditProfile from "./EditProfile"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector(store=>store.user.items);
  console.log(user);
  return(
    user &&(<div>
      <EditProfile user={user[0]}/>
    </div>)
  )
}

export default Profile
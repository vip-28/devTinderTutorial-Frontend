import axios from "axios"
import { BASE_URL } from "../Utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../Utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
const dispatch= useDispatch();
const feed= useSelector(store=>store.feed);


  const getFeed= async ()=>{
if(feed) return ;

      try{ const res = await axios.get(BASE_URL+"/feed",{withCredentials:true});
       dispatch(addFeed(res.data));}catch(err){
        console.log(err);
       }
  }

  useEffect(()=>{
    getFeed()
  },[]);

if(feed?.length===0){
  return(<div>No More Users</div>)
}
  return (
    
    feed && (
      <div className="flex justify-center h-[530px]">
        <UserCard  user={feed[0]} />
      </div>
    )
  )
}

export default Feed
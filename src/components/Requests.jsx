/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../Utils/constants";
import axios from "axios";
import { addRequests, removeRequests } from "../Utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/viewRequest", {
        withCredentials: true,
      });

      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  const reviewRequest= async (status,_id)=> {
    try {
      console.log(status);
      const res= await axios.post(BASE_URL+ "/request/review/"+status+"/"+_id, 
        {},
        {withCredentials:true}
      )
      dispatch(removeRequests(_id))
    } catch(err) {
      console.log(err);
    }
  }

  const requests = useSelector((store) => store.requests);

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) return <div>No requests Found</div>;

  return (
    
    <div>
      <div className="flex justify-center m-5 mb-10 text-4xl">requests</div>

      {requests.map((request, index) => {
       
        if(!(request?.status==="accepted")){
        return (
          <div
            className="card card-side bg-base-300 shadow-xl h-44 w-3/4 ml-44 m-4 "
            key={index}
          >
            <figure>
              <img
                className="h-44 w-44"
                src={request?.fromUserId?.photoUrl}
                alt="Movie"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {request?.fromUserId?.firstName +
                  " " +
                  request?.fromUserId?.lastName}
              </h2>
              <p className="m-0">{request?.fromUserId?.age}</p>
              <p className="m-0">{request?.fromUserId?.about}</p>
              <div className="card-actions right-10 top-8 absolute">
                <button className="btn btn-primary w-20" onClick={()=>reviewRequest("accepted",request?._id)}>Accept</button>
              </div>
              <div className="card-actions right-10 top-24 absolute">
                <button className="btn btn-secondary w-20"  onClick={()=>reviewRequest("rejected",request?._id)}>Remove</button>
              </div>
            </div>
          </div>
        );
      }
      })}
    </div>
  );
};

export default Requests;

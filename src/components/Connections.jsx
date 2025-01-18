/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { BASE_URL } from "../Utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../Utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();

  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      // console.log(res?.data?.data);
      dispatch(addConnection(res?.data?.data));
    } catch (err) {
      console.log(err?.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <div>No Connections Found</div>;

  return (
    <div>
      <div className="flex justify-center m-5 mb-10 text-4xl">Connections</div>
      {connections.map((connection, index) => {
        const { _id ,firstName, lastName, photoUrl, age, gender, about } =
          connection;
        console.log(_id);

        return (
          <div className="card card-side bg-base-300 shadow-xl h-44 w-3/4 ml-44 m-4 " key={index}>
            <figure>
              <img
                className="h-44 w-44"
                src={connection.photoUrl}
                alt="Movie"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {connection.firstName + " " + connection.lastName}
              </h2>
              <p className="m-0">{connection.age}</p>
              <p className="m-0">{connection.about}</p>
              <div className="card-actions right-10 top-16 absolute">
                <Link to={`/chat/${_id}`} > <button className="btn btn-primary w-20">Chat</button></Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;

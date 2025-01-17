import { useSelector } from "react-redux";
import { BASE_URL } from "../Utils/constants";
import axios from "axios";
import { useState, useEffect } from "react";

export const Admin = () => {
  const [logs, setLogs] = useState(null);
  const user = useSelector((store) => store.user.items);

  const saveProfile = async () => {
    try {
      const res = await axios.get(BASE_URL + "/admin/logs", {
        withCredentials: true,
      });
      setLogs(res?.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (user[0]?.role === "admin") {
      saveProfile();
    }
  }, [user]);

  if (user[0]?.role === "admin" && logs) {
    console.log(logs);

    return (
      <div>
        <h1>Admin Logs</h1>
        {logs.map((log, index) => (
          <div  className="flex" key={index}>
            {/* Customize how each log is displayed */}
            {log?.status == "accepted" ? (
              <div className=" flex  m-2">
                
                <p>
                  {log?.fromUserId?.firstName}({log?.fromUserId?._id}) was {log?.status} by{" "}
                  {log?.toUserId?.firstName}({log?.toUserId?._id})
                </p>
                
              </div>
            ) : (
              <div></div>
            )}
            {log?.status == "interested" ? (
              <div className=" flex  m-2">
            
                <p>
                  {log?.fromUserId?.firstName}({log?.fromUserId?._id}) is {log?.status} in{" "}
                  {log?.toUserId?.firstName}({log?.toUserId?._id})
                </p>
                
              </div>
            ) : (
              <div></div>
            )}
            {log?.status == "ignored" ? (
              <div className=" flex  m-2">
            
                <p>
                  {log?.fromUserId?.firstName}({log?.fromUserId?._id}) was {log?.status} by{" "}
                  {log?.toUserId?.firstName}({log?.toUserId?._id})
                </p>
                
              </div>
            ) : (
              <div></div>
            )}
            {log?.status == "rejected" ? (
              <div className=" flex  m-2">
            
                <p>
                  {log?.fromUserId?.firstName}({log?.fromUserId?._id}) was {log?.status} by{" "}
                  {log?.toUserId?.firstName}({log?.toUserId?._id})
                </p>
                
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ))}
      </div>
    );
  } else {
    return <div>Not an admin</div>;
  }
};

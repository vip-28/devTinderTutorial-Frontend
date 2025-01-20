import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../Utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { targetUserId } = useParams();
  console.log(targetUserId);
  const user = useSelector((store) => store.user.items);
  // console.log(user[0]._id);
  const userId = user[0]?._id;
  const firstName = user[0]?.firstName;
  //   useMessage();

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    socket.emit("joinChat", { firstName, userId, targetUserId });

    socket.on("messageRecieved",({firstName,text})=>{
        console.log(firstName+" : " +text);
        setMessage((message)=>[...message,{firstName,text}]);
    } )


    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId, firstName]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
  };

  return (
    <div className="w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600"> Chat </h1>
      <div className="flex-1 overflow-scroll p-5 ">
        {message.map((msg, index) => {
          return (
            <div className="" key={index}>
              <div className="chat chat-start">
                <div className="chat-image avatar">
                  {/* <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div> */}
                </div>
                <div className="chat-header">
                  {msg.firstName}
                  <time className="text-xs opacity-50">12:45</time>
                </div>
                <div className="chat-bubble">{msg.text}</div>
                <div className="chat-footer opacity-50">Delivered</div>
              </div>
             
            </div>
          );
        })}
      </div>
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 text-white rounded p-2 h-12"
        ></input>
        <button onClick={sendMessage} className="btn btn-secondary w-24 ">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

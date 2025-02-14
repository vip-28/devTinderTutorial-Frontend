import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../Utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../Utils/constants";

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

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });
    console.log(chat?.data?.messages);
    const chatMessages = chat?.data?.messages.map((msg) => {
      return {
        firstName: msg?.senderId?.firstName,
        lastName: msg?.senderId?.lastName,
        text: msg?.text,
      };
    });
    setMessage(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    socket.emit("joinChat", { firstName, userId, targetUserId });

    socket.on("messageRecieved", ({ firstName, text }) => {
      console.log(firstName + " : " + text);
      setMessage((message) => [...message, { firstName, text }]);
    });

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
    setNewMessage("");
  };

  return (
    <div className="w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600"> Chat </h1>
      <div className="flex-1 overflow-scroll  ">
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
                <div
                  className={`flex flex-col w-full ${
                    msg.firstName != firstName
                      ? "items-start text-left"
                      : "items-end text-right"
                  }`}
                >
                  <div className="chat-header">
                    {msg.firstName}
                    {/* <time className="text-xs opacity-50">12:45 pm</time> */}
                  </div>
                <div className={`chat ${msg.firstName!=firstName? "chat-start": "chat-end"}`}>
                  <div className="chat-bubble bg-neutral-700 rounded-lg">
                    {msg.text}
                  </div>
                  </div>
                  <div className="chat-footer opacity-50 text-xs">
                    Delivered
                  </div>
                </div>
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

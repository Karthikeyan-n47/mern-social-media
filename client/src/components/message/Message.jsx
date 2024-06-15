import { useEffect, useState } from "react";
import "./message.css";
// import { format } from "timeago.js";
import TimeAgo from "react-timeago";
import axios from "../../axios";

export default function Message({ message, own }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`/users?userId=${message?.sender}`);
        setUser(res?.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [message]);
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img src={user?.profilePicture} alt="" className="messageImg" />
        <p className="messageText">{message?.text}</p>
      </div>
      <TimeAgo className="messageBottom" date={message?.createdAt} />
    </div>
  );
}

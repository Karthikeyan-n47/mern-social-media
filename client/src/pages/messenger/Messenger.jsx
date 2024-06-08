import { useContext, useEffect, useState } from "react";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import TopBar from "../../components/topbar/TopBar";
import "./messenger.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
export default function Messenger() {
  const [conversations, setConversations] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`/conversations/${user?._id}`);
        setConversations(res?.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getConversations();
  }, [user?._id]);
  return (
    <>
      <TopBar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              className="chatMenuInput"
              placeholder="Search for friends..."
            />
            {conversations?.map((c, i) => {
              return (
                <Conversation key={i} conversation={c} currentUser={user} />
              );
            })}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <Message />
              <Message own />
              <Message />
              <Message own />
              <Message />
            </div>
            <div className="chatBoxBottom">
              <textarea
                name=""
                placeholder="write something..."
                id=""
                className="chatMessageInput"
              ></textarea>
              <button className="chatSubmitButton">send</button>
            </div>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
}

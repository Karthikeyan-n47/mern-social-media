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
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);

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

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`/messages/${currentChat?._id}`);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);
  // console.log(messages);
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
                <div onClick={() => setCurrentChat(c)} key={i}>
                  <Conversation key={i} conversation={c} currentUser={user} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages?.map((m, i) => {
                    return (
                      <Message
                        message={m}
                        key={i}
                        own={m?.sender === user?._id}
                      />
                    );
                  })}
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
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat{" "}
              </span>
            )}
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

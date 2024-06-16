import { useEffect, useState } from "react";
import "./chatOnline.css";
import axios from "../../axios";
export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get("/users/friends/" + currentId);
        setFriends(res?.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends?.filter((f) => onlineUsers?.includes(f?._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (friend) => {
    try {
      const res = await axios.get(
        `/conversations/find/${currentId}/${friend?._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((friend, i) => {
        return (
          <div
            className="chatOnlineFriend"
            key={i}
            onClick={() => {
              handleClick(friend);
            }}
          >
            <div className="chatOnlineImgContainer">
              <img
                src={
                  friend?.profilePicture
                    ? friend.profilePicture
                    : "https://socialmedia-mern-stack-s3-upload.s3.ap-south-1.amazonaws.com/uploads/1713266275730-noAvatar.png"
                }
                alt=""
                className="chatOnlineImg"
              />
              <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">{friend?.username}</span>
          </div>
        );
      })}
    </div>
  );
}

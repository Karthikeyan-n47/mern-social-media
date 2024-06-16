import "./post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";
import axios from "../../axios";
import TimeAgo from "react-timeago";
import { Link } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
import { useSelector } from "react-redux";

export default function Post({ post }) {
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`, {
        // data: {
        //   id: post.userId,
        // },
        // headers: {
        //   "Content-Type": "application/json",
        // },
      });
      // console.log(res);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);
  // const user = Users.filter((u) => u.id === post.userId)[0];
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [like, setLike] = useState(post.likes?.length);
  const [isLike, setIsLike] = useState(false);
  // const { user: currentUser } = useContext(AuthContext);
  const { user: currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    setIsLike(post?.likes?.includes(currentUser?._id));
  }, [currentUser?._id, post?.likes]);
  const handleClick = async () => {
    try {
      await axios.put("/posts/" + post._id + "/like", {
        userId: currentUser._id,
      });
    } catch (err) {
      console.log(err);
    }
    setLike(isLike ? like - 1 : like + 1);
    setIsLike(!isLike);
  };
  return (
    <div className="postContainer">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user?.profilePicture
                    ? user.profilePicture
                    : PF + "/person/noAvatar.png"
                }
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <TimeAgo className="postDate" date={post?.createdAt} />
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">
            {post.desc || "Hello there! It is my first Post :)"}
          </span>
          <img
            src={post.img || PF + `/post/2.jpeg`}
            alt=""
            className="postImg"
          />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src={`${PF}/like.png`}
              alt=""
              className="postLikeIcon"
              onClick={handleClick}
            />
            <img
              src={`${PF}/heart.png`}
              alt=""
              className="postLikeIcon"
              onClick={handleClick}
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

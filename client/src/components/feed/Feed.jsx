import { useEffect, useState, React } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "../../axios";
// import { AuthContext } from "../../context/AuthContext";
import { useSelector } from "react-redux";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  // const { user } = useContext(AuthContext);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(`/posts/profile/${username}`)
        : await axios.get(`/posts/timeline/${user?._id}`);
      // console.log(res.data);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user?._id]);
  return (
    <div className="feedContainer">
      <div className="feedWrapper">
        {username ? username === user?.username && <Share /> : <Share />}
        {posts &&
          posts.map((p) => {
            return <Post post={p} key={p._id} />;
          })}
      </div>
    </div>
  );
}

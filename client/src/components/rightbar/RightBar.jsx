import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useEffect, useState } from "react";
import axios from "../../axios";
import { Link } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../../redux/user/userSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function RightBar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // console.log(user);
  const [friends, setFriends] = useState(null);
  // const { user: currentUser } = useContext(AuthContext);
  const { user: currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);
  const [followed, setFollowed] = useState(
    // currentUser.following.includes(user?._id)
    false
  );
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    setFollowed(currentUser?.following?.includes(user?._id));
  }, [currentUser, user?._id, followed]);
  // console.log(followed, currentUser.following, user);

  useEffect(() => {
    const getFreinds = async () => {
      try {
        // console.log(user);
        const friendsList = await axios.get(`/users/friends/${user?._id}`);
        setFriends(friendsList?.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFreinds();
  }, [user]);

  const handleClick = async () => {
    // e.preventDefault();
    dispatch(updateUserStart());
    let res;
    try {
      if (followed) {
        res = await axios.put("/users/" + user._id + "/unfollow", {
          id: currentUser?._id,
        });
        dispatch(updateUserSuccess(res?.data?.currentUser));
        // setFriends(res?.data?.user?.followers)
      } else {
        res = await axios.put("/users/" + user._id + "/follow", {
          id: currentUser?._id,
        });
        dispatch(updateUserSuccess(res?.data?.currentUser));
      }
      // navigate("/");
    } catch (err) {
      dispatch(updateUserFailure(err));
      // console.log(err);
    }
    setFollowed(!followed);
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src={`${PF}/gift.png`} alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b>Abc</b> and <b>3 other friends</b> have their birthday today
          </span>
        </div>
        <img src={`${PF}/ad.png`} alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => {
            return <Online user={u} key={u.id} />;
          })}
        </ul>
      </>
    );
  };
  const ProfileRightbar = () => {
    return (
      <>
        {user?.username !== currentUser?.username && (
          <button className="rightbarFollowIcon" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <RemoveIcon /> : <AddIcon />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Current City :</span>
            <span className="rightbarInfoValue"> {user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From :</span>
            <span className="rightbarInfoValue"> {user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship :</span>
            <span className="rightbarInfoValue">
              {" "}
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : ""}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">Friends</h4>
        <div className="rightbarFollowings">
          {friends?.map((friend) => {
            return (
              <div key={friend?._id}>
                <Link
                  to={`/profile/${friend?.username}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="rightbarFollowing">
                    <img
                      src={
                        friend?.profilePicture
                          ? friend.profilePicture
                          : `${PF}/person/noAvatar.png`
                      }
                      alt=""
                      className="rightbarFollowingImg"
                    />
                    <span className="rightbarFollowingName">
                      {friend?.username}
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </>
    );
  };
  return (
    <div className="rightbarContainer">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}

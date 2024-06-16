import "./topbar.css";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";
import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { logoutCall } from "../../apiCalls";
export default function TopBar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // const { user, dispatch } = useContext(AuthContext);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleClick = () => {
    logoutCall(dispatch);
    // navigate("/login");
    // window.location.reload();
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <span className="logo">SocialMedia</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchBar">
          <SearchIcon className="searchIcon" />
          <input
            type="text"
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Home</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <PersonIcon />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <ChatIcon />
            <span className="topbarIconBadge">3</span>
          </div>
          <div className="topbarIconItem">
            <NotificationsIcon />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem" onClick={handleClick}>
            <LogoutIcon />
            {/* <span className="topbarIconBadge">1</span> */}
          </div>
        </div>
        <Link to={`/profile/${user?.username}`}>
          <img
            src={
              user?.profilePicture
                ? `${PF}/${user.profilePicture}`
                : `${PF}/person/noAvatar.png`
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}

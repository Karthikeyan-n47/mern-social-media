import "./share.css";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LabelIcon from "@mui/icons-material/Label";
import RoomIcon from "@mui/icons-material/Room";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { useRef, useState } from "react";
// import { AuthContext } from "../../context/AuthContext";
import { useSelector } from "react-redux";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "../../axios";

export default function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // const { user } = useContext(AuthContext);
  const { user } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const desc = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("userId", user?._id);
    data.append("desc", desc?.current.value);
    if (file) {
      data.append("file", file);
    }
    try {
      await axios.post("/posts/", data);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="shareContainer">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={
              user?.profilePicture
                ? PF + user.profilePicture
                : `${PF}/person/noAvatar.png`
            }
            alt=""
            className="shareProfileImg"
          />
          <input
            placeholder={`what's on your mind ${user?.username}?`}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
            <CancelIcon
              className="shareCancelImg"
              onClick={() => setFile(null)}
            />
          </div>
        )}
        <form className="shareBottom" onSubmit={handleSubmit}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMediaIcon htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".jpeg, .png, .jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <LabelIcon htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tags</span>
            </div>
            <div className="shareOption">
              <RoomIcon htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <InsertEmoticonIcon htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Emoji</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}

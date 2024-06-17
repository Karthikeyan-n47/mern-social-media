import "./forgotPassword.css";
import axios from "../../axios";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/forgot-password", {
        email,
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="forgotPasswordContainer">
      <div className="forgotPasswordWrapper">
        <div className="forgotPasswordLeft">
          <h3 className="forgotPasswordLogo">SocialMedia</h3>
          <span className="forgotPasswordDesc">
            Connecting people worldwide!
          </span>
        </div>
        <div className="forgotPasswordRight">
          <form className="forgotPasswordBox" onSubmit={handleSubmit}>
            <input
              placeholder="Enter your registered email address..."
              type="email"
              className="forgotPasswordInput"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="forgotPasswordButton" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import "./resetPassword.css";
import axios from "../../axios";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { id, token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert("Passwords entered does not match!");
    }
    try {
      await axios.post(`/auth/reset-password/${id}/${token}`, {
        password,
        confirmPassword,
      });
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="resetPasswordContainer">
      <div className="resetPasswordWrapper">
        <div className="resetPasswordLeft">
          <h3 className="resetPasswordLogo">SocialMedia</h3>
          <span className="resetPasswordDesc">
            Connecting people worldwide!
          </span>
        </div>
        <div className="resetPasswordRight">
          <form className="resetPasswordBox" onSubmit={handleSubmit}>
            <input
              placeholder="Enter your new password..."
              type="password"
              className="resetPasswordInput"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              placeholder="Confirm your new password..."
              type="password"
              className="resetPasswordInput"
              minLength={6}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className="resetPasswordButton" type="submit">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

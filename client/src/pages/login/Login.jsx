import React from "react";
import "./Login.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await newRequest.post("auth/login", { username, password }); //passing the username and password
      localStorage.setItem("currentUser", JSON.stringify(res.data)) //can set only string to localStorage
      console.log(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
      console.log(err);
    }
  };

  

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <label htmlFor="">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
        {error && error}
      </form>
    </div>
  );
};

export default Login;

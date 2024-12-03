import React, { useState } from "react";
import "../LoginPage/LoginPage.css";
import email_image from "../assets/email.png";
import person_image from "../assets/person.png";
import password_image from "../assets/password.png";

const LoginPageMain = () => {
  const [action, setAction] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [users, setUsers] = useState([]);

  const handleLogin = () => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Invalid email or password");
    }
  };

  const handleSignUp = () => {
    if (users.find((user) => user.email === email)) {
      setLoginError("User with this email already exists.");
      return;
    }

    if (name && email && password) {
      setUsers([...users, { name, email, password }]);
      alert("Sign-up successful! You can now log in.");
      setAction("Login");
      setLoginError("");
      setName("");
      setEmail("");
      setPassword("");
    } else {
      setLoginError("All fields are required for sign-up.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
    setName("");
    setAction("Login");
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      {isLoggedIn ? (
        <div className="welcome-container">
          <h2>Welcome, {email}! in your Reading book club</h2>
          <div className="submit" onClick={handleLogout}>
            Logout
          </div>
        </div>
      ) : (
        <>
          <div className="inputs">
            {action === "Sign Up" && (
              <div className="input">
                <img src={person_image} alt="" />
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            <div className="input">
              <img src={email_image} alt="" />
              <input
                type="email"
                placeholder="email@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input">
              <img src={password_image} alt="" />
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {loginError && <div className="error">{loginError}</div>}
          </div>
          <div className="submit-container">
            <div
              className={action === "Sign Up" ? "submit gray" : "submit"}
              onClick={() => {
                if (action === "Login") {
                  handleLogin();
                } else {
                  setAction("Login");
                }
              }}
            >
              Login
            </div>

            <div
              className={action === "Login" ? "submit gray" : "submit"}
              onClick={() => {
                if (action === "Sign Up") {
                  handleSignUp();
                } else {
                  setAction("Sign Up");
                }
              }}
            >
              Sign up
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginPageMain;

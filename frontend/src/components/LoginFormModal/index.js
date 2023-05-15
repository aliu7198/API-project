import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [inputErrors, setInputErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    const errors = {};
    if (credential.length < 4)
      errors.credential = "Username must have at least 4 characters";
    if (password.length < 6)
      errors.password = "Password must have at least 6 characters";
    setInputErrors(errors);
  }, [credential, password]);

  const demoLogin = (e) => {
    e.preventDefault();
    setErrors({});

    const demoUser = {
      credential: "ChildOfBrightness714",
      password: "HinokamiKagura1",
    };

    return dispatch(sessionActions.login(demoUser))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <div className="modal__wrapper">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        {errors.credential && <p className="errors">{errors.credential}</p>}
        <label htmlFor="credential">
          Username or Email
          <br></br>
          <input
            id="credential"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            placeholder="user@example.io"
          />
        </label>
        <label htmlFor="password">
          Password
          <br></br>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="At least 6 characters required"
          />
        </label>
        <button
          className="login-button"
          type="submit"
          disabled={Object.values(inputErrors).length}
        >
          <span>Log In</span>
        </button>
        <button id="demo-user" onClick={demoLogin}>
          Log in as Demo User
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;

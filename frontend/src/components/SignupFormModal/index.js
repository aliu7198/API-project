import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const errorsArr = Object.values(errors);

  useEffect(() => {
    const errors = {};
    if (username.length < 4) errors.username = "Username must be at least 4 characters"
    if (password.length < 6) errors.password = "Password must be at least 6 characters"
    setFormErrors(errors);
  }, [username, password])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <div className="signup__wrapper">
      <h1>Sign Up</h1>
      {errorsArr.map(error => (
        <p className="errors">{error}</p>
      ))}
      <form onSubmit={handleSubmit} className="signup-form">
        <label htmlFor="first-name">
          First Name
          <input
            id="first-name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="Required"
          />
        </label>
        <label htmlFor="last-name">
          Last Name
          <input
            id="last-name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Required"
          />
        </label>
        <label htmlFor='email'>
          Email
          <input
            id='email'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="user@example.io"
          />
        </label>
        <label htmlFor="username">
          Username
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Minimum 4 characters; Maximum 30 characters"
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Minimum 6 characters"
          />
        </label>
        <label htmlFor="confirm-password">
          Confirm Password
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Passwords must match"
          />
        </label>
        <button
          type="submit"
          className="signup-button"
          disabled={!(email && username && firstName && lastName && password && confirmPassword) || Object.values(formErrors).length}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormModal;

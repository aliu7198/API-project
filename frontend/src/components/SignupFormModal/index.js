import React, { useState } from "react";
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
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

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

  console.log(errors);

  return (
    <div className="wrapper">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
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
        {errors.email && <p className="errors">{errors.email}</p>}
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
        {errors.username && <p className="errors">{errors.username}</p>}
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
        {errors.firstName && <p className="errors">{errors.firstName}</p>}
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
        {errors.lastName && <p className="errors">{errors.lastName}</p>}
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
        {errors.password && <p className="errors">{errors.password}</p>}
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
        {errors.confirmPassword && (
          <p className="errors">{errors.confirmPassword}</p>
        )}
        <button
          type="submit"
          className="signup-button"
          disabled={!(email && username && firstName && lastName && password && confirmPassword)}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormModal;

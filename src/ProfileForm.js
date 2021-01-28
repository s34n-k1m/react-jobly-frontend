import { useContext, useState } from "react";
import UserContext from "./userContext";

function ProfileForm() {
  const { username, firstName, lastName, email } = useContext(UserContext);

  const [formData, setFormData] = useState({ username, firstName, lastName, email, password: "" });


  function handleSubmit() {

  }

  function handleChange() {

  }

  return (
    <div className="SignupForm col-6 container">
      <form className="SignupForm-form my-3 mx-15" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <p className="form-control-plaintext">{username}</p>

          <label htmlFor="firstName" className="ProfileForm-firstName">First Name</label>
          <input
            className="SignupForm-firstName form-control flex-grow-1"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <label htmlFor="lastName" className="ProfileForm-lastName">Last Name</label>
          <input
            className="SignupForm-lastName form-control flex-grow-1"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />

          <label htmlFor="email" className="ProfileForm-email">Email</label>
          <input
            className="SignupForm-email form-control flex-grow-1"
            name="email"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="password" className="ProfileForm-password">Confirm password to make changes:</label>
          <input
            className="SignupForm-password form-control flex-grow-1"
            name="password"
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {/* {displayErrorMessage()} */}
          <button className="btn btn-primary mt-3">Sign Up!</button>
        </div>

      </form>
    </div>
  );


}


export default ProfileForm;
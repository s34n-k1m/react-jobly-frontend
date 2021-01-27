import { useState } from "react";
import { Redirect } from "react-router-dom";

/* 
Props: signup function from Routes, App
State: formData
App -> Routes -> SignupForm
*/
function SignupForm({ signup, currentUser}) {
  const initialFormData = { username: "test", password: "password", firstName: "testf", lastName: "testl", email: "test@test.com" }
  const [formData, setFormData] = useState(initialFormData);

  function handleSubmit(evt) {
    evt.preventDefault();
    signup(formData);
    setFormData(initialFormData);
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({ ...fData, [name]: value }));
  }

  if (Object.keys(currentUser).length !== 0) return <Redirect to="/companies" />

  return (
    <div className="SignupForm col-6 container">
      <form className="SignupForm-form my-3 mx-15" onSubmit={handleSubmit}>
        <label htmlFor="username" className="">Username</label>
        <input
          className="SignupForm-username form-control flex-grow-1"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
        />
        <label htmlFor="password" className="">Password</label>
        <input
          className="SignupForm-password form-control flex-grow-1"
          name="password"
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <label htmlFor="firstName" className="">First Name</label>
        <input
          className="SignupForm-firstName form-control flex-grow-1"
          name="firstName"
          id="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <label htmlFor="lastName" className="">Last Name</label>
        <input
          className="SignupForm-lastName form-control flex-grow-1"
          name="lastName"
          id="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />

        <label htmlFor="email" className="">Email</label>
        <input
          className="SignupForm-email form-control flex-grow-1"
          name="email"
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <button className="btn btn-primary mt-3">Sign Up!</button>
      </form>
    </div>
  );

}

export default SignupForm;
import { useState } from "react";
import { Redirect } from "react-router-dom";

/* 
Props: login function from Routes, App
State: formData
App -> Routes -> LoginForm
*/
function LoginForm({ login, currentUser}) {
  const initialFormData = { username: "test", password: "password"}
  const [formData, setFormData] = useState(initialFormData);

  function handleSubmit(evt) {
    evt.preventDefault();
    login(formData);
    setFormData(initialFormData);
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({ ...fData, [name]: value }));
  }
  if (Object.keys(currentUser).length !== 0) return <Redirect to="/companies" />

  return (
    <div className="LoginForm col-6 container">
      <form className="LoginForm-form my-3 mx-15" onSubmit={handleSubmit}>
        <label htmlFor="username" className="">Username</label>
        <input
          className="LoginForm-username form-control flex-grow-1"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
        />
        <label htmlFor="password" className="">Password</label>
        <input
          className="LoginForm-password form-control flex-grow-1"
          name="password"
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button className="btn btn-primary mt-3">Log in!</button>
      </form>
    </div>
  );

}

export default LoginForm;
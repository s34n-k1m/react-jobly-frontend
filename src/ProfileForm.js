import { useContext, useEffect, useState } from "react";
import UserContext from "./userContext";


/* ProfileForm Component
Props: 
- updateProfile: function passed from App Component

State: 
  formData
  errorMessages
  isUpdating
  successMessage

App -> Routes -> ProfileForm
*/
function ProfileForm({ updateProfile }) {
  const { username, firstName, lastName, email } = useContext(UserContext);
  
  const [formData, setFormData] = useState({ username, firstName, lastName, email, password: "" });
  const [errorMessages, setErrorMessages] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  /* Handles form submission */
  function handleSubmit(evt) {
    evt.preventDefault();
    setIsUpdating(true);
  }

  useEffect(function updateUserProfile() {
    async function updateProfileAPICall() {
      const resUpdate = await updateProfile(formData);

      if (resUpdate[0] === "Profile update successful") {
        setFormData(fData => ({ ...fData, password: "" }));
        setSuccessMessage("Successfully updated");
      } else {
        setSuccessMessage(null);
        setErrorMessages(resUpdate);
      }
    }

    if (isUpdating) {
      updateProfileAPICall();
      setIsUpdating(false)
    }

  }, [isUpdating, updateProfile, formData])

  /* Handles form data changes */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({ ...fData, [name]: value }));
  }

  /* Displays error message if wrong login info inputted */
  function displayErrorMessage() {
    return (
      <>
        {
          errorMessages.length > 0
            ? errorMessages.map((e, i) => (
              <div key={i} className="alert alert-danger mt-3">{e}</div>))
            : null
        }
      </>);
  }
  
  /* Displays success message if user profile update successful */
  function displaySuccessMessage() {
    return (
      <>
        {
          successMessage
            ? <div className="alert alert-success mt-3">{successMessage}</div>
            : null
        }
      </>);
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
          <label htmlFor="password" className="ProfileForm-password">Change password:</label>
          <input
            className="SignupForm-password form-control flex-grow-1"
            name="password"
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {displayErrorMessage()}
          {displaySuccessMessage()}
          <button className="btn btn-primary mt-3">Update</button>
        </div>

      </form>
    </div>
  );


}


export default ProfileForm;
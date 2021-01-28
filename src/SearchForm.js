import { useState } from "react";

/* 
props: search function
state: formData {searchTerm:""}
App -> CompanyList, JobList -> SearchForm
*/
function SearchForm({ search }) {
  const [formData, setFormData] = useState({ searchTerm: "" });

  function handleSubmit(evt) {
    evt.preventDefault();
    search(formData.searchTerm);
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData({ [name]: value });
  }

  return (
    <div className="SearchForm">
      <form className="SearchForm-form form-inline my-3" onSubmit={handleSubmit}>
        <input
          className="SearchForm-searchTerm form-control flex-grow-1"
          name="searchTerm"
          id="searchTerm"
          value={formData.searchTerm}
          placeholder="Enter search term here"
          onChange={handleChange}
          minLength="3"
          required
        >
        </input>
        <button className="btn btn-primary">Search</button>
      </form>
    </div>
  );

}

export default SearchForm;
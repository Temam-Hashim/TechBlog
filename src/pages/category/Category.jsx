import "./Category.css";
import { useState } from "react";
import axios from "axios";
const Category = () => {
  const [catName, setCatName] = useState();
  const handleCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/category/", { name: catName });
      if (res) {
        alert("category Inserted");
      }
    } catch (error) {
      alert("failed to insert Category");
    }
  };
  return (
    <div className="category">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-6 catContainer">
          <form className="catForm" onSubmit={handleCategory}>
            <legend className="caption">Add New Category</legend>
            <div className="form-group">
              <label for="category">Category Name</label>
              <input
                type="text"
                className="form-control catInput"
                id="category"
                placeholder="enter category name"
                onChange={(e) => setCatName(e.target.value)}
              />
            </div>
            <button class="catBtn btn btn-info" type="submit">
              SUBMIT
            </button>
          </form>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
};
export default Category;

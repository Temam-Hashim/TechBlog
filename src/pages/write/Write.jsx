import "./Write.css";
import Creatable from "react-select/creatable";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Context } from "../../context/Context";

function Write() {
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  // db value  for tag and category
  const [tag, setTag] = useState([]);
  const [category, setCategory] = useState([]);

  // selected value for tag and categoryy
  const [tagOption, setTagOption] = useState([]);
  const [categoryOption, setCategoryOption] = useState([]);

  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  // get category
  useEffect(() => {
    const getCat = async () => {
      const res = await axios.get("/category");
      setCategory(res.data);
      // console.log(res.data);
    };
    getCat();
    // get tags
    const getTag = async () => {
      const res = await axios.get("/tags");
      setTag(res.data);
    };
    getTag();
  }, []);

  const selectedCategory = category.map((row) => {
    return { value: row.name, label: row.name };
  });
  const selectedTags = tag.map((t) => {
    return { value: t, label: t };
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title: title,
      desc: desc,
      category: Object.values(categoryOption).map((key) => key["label"]),
      tags: Object.values(tagOption).map((key) => key["label"]),
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.image = filename;

      // upload image
      try {
        await axios.post("/upload", data);
      } catch (error) {
        setError("Failed to upload image");
      }
    }

    // upload post
    try {
      const res = await axios.post("/posts", newPost);
      alert("NEW POST ADDED");
      window.location.replace("/posts/" + res.data._id);
    } catch (error) {
      setError("FAILED TO ADD POST");
    }
  };

  return (
    <div className="write">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <span className="error">{error}</span>
            <div className="writeFormGroup">
              <div className="postImage">
                <img
                  className="writeImage"
                  src={file && URL.createObjectURL(file)}
                  style={{
                    width: "94%",
                    height: 200,
                    objectFit: "cover",
                    borderRadius: 16,
                  }}
                  alt=""
                />
              </div>
              <div className="form-group fileInputGroup">
                <label htmlFor="fileInput" className="fileInputLabel">
                  <i className="fileInputIcon fa-solid fa-upload" /> UPLOAD POST
                  IMAGE
                </label>
                <input
                  className="form-control"
                  type="file"
                  accept="image/*"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <div className="form-group textGroup">
                <input
                  style={{ height: "52px" }}
                  className="form-control writeTitle"
                  type="text"
                  id="writeTitle"
                  placeholder="Enter Post Title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group textGroup">
                <Creatable
                  options={selectedCategory}
                  isMulti
                  placeholder={"select category"}
                  onChange={setCategoryOption}
                />
              </div>
              <div className="form-group textGroup">
                <Creatable
                  options={selectedTags}
                  isMulti
                  placeholder={"select tag"}
                  onChange={setTagOption}
                />
              </div>
              <div className="form-group textGroup">
                <textarea
                  className="form-control writeText"
                  type=""
                  id="writeText"
                  placeholder="Enter Post Description"
                  onChange={(e) => setDesc(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group text-end btnGroup">
                <input
                  className="btn publishBtn"
                  type="submit"
                  id="publishBtn"
                  value="PUBLISH"
                />
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </form>
    </div>
  );
}

export default Write;

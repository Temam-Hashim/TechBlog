import "./Update.css";
import Creatable from "react-select/creatable";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Context } from "../../context/Context";

function Update() {
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  // get tag and category from db
  const [category, setCategory] = useState([]);
  const [tag, setTag] = useState([]);

  // get selected option for tag and category
  const [categoryOption, setCategoryOption] = useState([]);
  const [tagOption, setTagOption] = useState([]);

  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [post, setPost] = useState("");

  const PF = "https://techblogapi.onrender.com/images/";

  // get the original post
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts/" + postId);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setCategoryOption(res.data.category);
      setTagOption(res.data.tags);
    };
    fetchPosts();
  }, [postId]);

  // get category
  useEffect(() => {
    const getCat = async () => {
      const res = await axios.get("/category/");
      setCategory(res.data);
    };
    getCat();
    // get tags
    const getTag = async () => {
      const res = await axios.get("/tags/");
      setTag(res.data);
    };
    getTag();
  }, []);

  const selectedCategory = category.map((row) => {
    return { value: row.name, label: row.name };
  });
  const selectedTag = tag.map((row) => {
    return { value: row, label: row };
  });

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatePost = {
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
      updatePost.image = filename;

      // upload image
      try {
        await axios.post("/upload/", data);
      } catch (error) {
        setError("Failed to upload image");
      }
    }
    // upload post

    try {
      const res = await axios.put("/posts/" + postId, updatePost);
      if (res.data) {
        alert("POST UPDATED SUCCESSFULLY");
        window.location.replace("/posts/" + post._id);
      } else {
        setError("FAILED TO UPDATE YOUR POST");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to update! unauthorized user");
    }
  };

  return (
    <div className="update">
      <form onSubmit={handleUpdate}>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="updateFormGroup">
              <div className="postImage">
                <img
                  className="writeImage"
                  src={file ? URL.createObjectURL(file) : PF + post.image}
                  style={{
                    width: "94%",
                    height: 200,
                    objectFit: "cover",
                    borderRadius: 16,
                  }}
                  alt=""
                />
              </div>
              <div className="form-group fileInputGroup" htmlFor="fileInput">
                <label htmlFor="fileInput" className="fileInputLabel">
                  <i className="fileInputIcon fa-solid fa-upload" /> CHANGE POST
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group textGroup">
                <Creatable
                  options={selectedCategory}
                  isSearchable
                  placeholder={"select Category"}
                  onChange={setCategoryOption}
                  isMulti
                />
              </div>
              <div className="form-group textGroup">
                <Creatable
                  options={selectedTag}
                  isMulti
                  placeholder={"select Tags"}
                  onChange={setTagOption}
                  required={true}
                />
              </div>
              <div className="form-group textGroup">
                <textarea
                  className="form-control writeText"
                  type=""
                  id="writeText"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                ></textarea>
              </div>
              <span className="error">{error}</span>
              <div className="form-group text-end btnGroup">
                <input
                  className="btn publishBtn"
                  type="submit"
                  id="publishBtn"
                  value="SAVE CHANGES"
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

export default Update;

import "./Settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useRef, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Settings() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5005/images/";
  const userRef = useRef();
  const emailRef = useRef();
  const mobileRef = useRef();
  const passRef = useRef();
  const [file, setFile] = useState();
  const [error, setError] = useState("");
  // handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const userData = {
      userId: user._id,
      username: userRef.current.value,
      email: emailRef.current.value,
      mobile: mobileRef.current.value,
      password: passRef.current.value,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      userData.profilePicture = filename;

      //   // upload image
      try {
        await axios.post("/upload/", data);
      } catch (error) {
        setError("Failed to upload image");
      }
    }
    const res = await axios.put("/users/" + user._id, userData);
    console.log(res.data);
    if (res.data) {
      // localStorage.setItem("user", JSON.stringify(res.data));
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      alert("User Updated Successfully!");
    } else {
      setError("Failed To Update User");
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <div className="settings row">
      <div className="col-md-9 settingsWrapper">
        <form className="userProfileForm" onSubmit={handleUpdate}>
          <div className="infoBtn">
            <legend className="settingTittle">Update Your Account</legend>
            <button className="btn btn-danger float-end deleteBtn">
              Delete Your Account
            </button>
          </div>
          <div className="userProfileImage">
            <span style={{ textAlign: "center", color: "red" }}>{error}</span>
            <label htmlFor="profileInput">
              <img
                src={
                  file ? URL.createObjectURL(file) : PF + user.profilePicture
                }
                className="imagePP"
                alt=""
              />
            </label>
            <label htmlFor="profileInput" className="cameraLabel">
              <i className="imageIcon fa-solid fa-camera" />
              choose profile
            </label>
            <input
              type="file"
              accept="image/*"
              id="profileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="userProfileInfo">
            <div className="form-group userInputGroup">
              <label htmlFor="username" className="labels">
                User Name
              </label>
              <input
                type="text"
                className="form-control inputs"
                id="username"
                placeholder="Enter Username"
                defaultValue={user.username}
                ref={userRef}
              />
            </div>
            <div className="form-group userInputGroup">
              <label htmlFor="email" className="labels">
                Email Address
              </label>
              <input
                type="email"
                className="form-control inputs"
                id="email"
                placeholder="Enter Email Address"
                defaultValue={user.email}
                ref={emailRef}
              />
            </div>
            <div className="form-group userInputGroup">
              <label htmlFor="mobile" className="labels">
                Mobile Number
              </label>
              <input
                type="tel"
                className="form-control inputs"
                id="mobile"
                placeholder="Enter Mobile Number"
                defaultValue={user.mobile}
                ref={mobileRef}
              />
            </div>
            <div className="form-group userInputGroup">
              <label htmlFor="password" className="labels">
                Password
              </label>
              <input
                type="password"
                className="form-control inputs"
                id="password"
                placeholder="Enter Your Password"
                ref={passRef}
              />
            </div>
            <div className="form-group text-end">
              <button className="btn submitBtn" type="submit">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
      <Sidebar />
    </div>
  );
}

// export default Settings

import "./Sidebar.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../context/Context";

function Sidebar() {
  const PF = "http://localhost:5005/images/";
  const { user } = useContext(Context);
  const [latest, setLatest] = useState([]);
  const [cats, setCats] = useState([]);
  const [tags, setTags] = useState([]);
  useEffect(() => {
    // get latest post
    const getLatest = async () => {
      const res = await axios.get("/posts/");
      setLatest(res.data);
    };
    getLatest();
    // get category
    const getCat = async () => {
      const res = await axios.get("/category/");
      setCats(res.data);
    };
    getCat();
    // get tags
    const getTags = async () => {
      const res = await axios.get("/tags/");
      setTags(res.data);
    };
    getTags();
  }, []);

  return (
    <>
      <div className="sidebar col-md-3">
        {user && (
          <div className="sidebarItem">
            <span className="sidebarTitle">ABOUT ME</span>
            <img className="sidebarImg" src={PF + user.profilePicture} alt="" />
            <div className="userDetail">
              <ul className="userLists">
                <li className="userItem">
                  <i className="fa fa-envelope userIcon"></i> {user.email}
                </li>
                <li className="userItem">
                  <i className="fa fa-phone userIcon"></i> {user.mobile}
                </li>
              </ul>
            </div>
          </div>
        )}

        <div className="sidebarItem">
          <span className="sidebarTitle">CATEGORY</span>
          <ul className="sidebarLists">
            {cats?.map((cat) => (
              <Link to={`/?cat=${cat.name}`} className="Link" key={cat._id}>
                <li className="sidebarListItem">{cat.name}</li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="sidebarItem">
          <span className="sidebarTitle">Tags</span>
          <ul className="sidebarLists">
            {tags?.map((tag) => (
              <Link to={`/?tag=${tag}`} className="Link" key={tag}>
                <li
                  className="sidebarListItem"
                  style={{ color: "#54a893", fontStyle: "normal" }}
                >
                  # {tag}
                </li>
              </Link>
            ))}
          </ul>
        </div>

        <div className="sidebarItem" style={{ alignItems: "center" }}>
          <span className="sidebarTitle">LATEST POSTS</span>
          {/* latest post 1 */}
          {latest?.map((post) => (
            <div className="latestPostContainer" key={post._id}>
              <Link to={`/posts/${post._id}`} className="Link">
                <h6 className="latestTitle">{post.title}</h6>
              </Link>
              <Link to={`/posts/${post._id}`} className="Link">
                <img
                  className="latestImg"
                  src={
                    post.image ? PF + post.image : "https://picsum.photos/200"
                  }
                  alt="latest"
                />
              </Link>

              <div className="latestDate">
                <span className="date">
                  {new Date(post.createdAt).toDateString()}
                </span>
                <Link to={`/?user=${post.username}`} className="Link">
                  <span className="publisher">By {post.username}</span>
                </Link>
              </div>
              <Link to={`/posts/${post._id}`} className="Link">
                <span className="latestDesc">{post.desc}</span>
              </Link>
            </div>
          ))}
        </div>
        <div className="sidebarItem">
          <span className="sidebarTitle">FOLLOW US</span>
          <div className="sidebarSocial">
            <i className="sidebarIcons fa-brands fa-facebook"></i>
            <i className="sidebarIcons fa-brands fa-twitter"></i>
            <i className="sidebarIcons fa-brands fa-instagram"></i>
            <i className="sidebarIcons fa-brands fa-linkedin"></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;

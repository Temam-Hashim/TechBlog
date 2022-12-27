import "./TopBar.css";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

function TopBar() {
  const PF = "http://localhost:5005/images/";
  const { user, dispatch } = useContext(Context);
  const [search, setSearch] = useState("");
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.replace("/login");
  };

  // handle search
  const handleSearch = (e) => {
    e.preventDefault();
    window.location.replace(`/?search=${search}`);
  };

  return (
    <div className="top">
      <nav
        className="navbar navbar-expand-lg fixed-top"
        style={{ backgroundColor: "#085f6d" }}
      >
        <div className="container-fluid" style={{ marginRight: 50 }}>
          <button
            className="navbar-toggler navbar-dark"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link to={"/"} className="Link">
            <img
              className="navbar-brand brand"
              src={require("./../../assets/img/T.jpeg")}
              alt=""
            />
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <Link to={"/"} className="Link">
                <li className="nav-item">
                  <span className="nav-link">HOME</span>
                </li>
              </Link>
              <Link to={"/about"} className="Link">
                <li className="nav-item">
                  <span className="nav-link">ABOUT</span>
                </li>
              </Link>
              <Link to={"/contact"} className="Link">
                <li className="nav-item">
                  <span className="nav-link">CONTACT</span>
                </li>
              </Link>
              {!user ? (
                <Link to={"/login"} className="Link">
                  <li className="nav-item float-right">
                    <span className="nav-link">LOGIN</span>
                  </li>
                </Link>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      CREATE{" "}
                    </a>
                    <ul className="dropdown-menu">
                      <Link to="/write" className="Link">
                        <li>
                          <span className="dropdown-item">CREATE POST</span>
                        </li>
                      </Link>
                      <Link to="/category" className="Link">
                        <li>
                          <span className="dropdown-item">CREATE CATEGORY</span>
                        </li>
                      </Link>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      {/* <li>
                        <span className="dropdown-item">TECH</span>
                      </li> */}
                    </ul>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link" onClick={handleLogout}>
                      LOGOUT
                    </span>
                  </li>
                </>
              )}
            </ul>
            <form
              className="d-flex searchContainer"
              role="search"
              onSubmit={handleSearch}
            >
              <input
                className="form-control me-2 searchInput"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />

              <Link className="Link" to={`/?search=${search}`}>
                <button
                  className="btn btn-outline-success searchBtn"
                  type="submit"
                >
                  <SearchIcon />
                </button>
              </Link>
            </form>
          </div>
        </div>
        <div className="imgContainer">
          {!user ? (
            " "
          ) : (
            <Link to={"/settings"} className="Link">
              <img
                className="profileImage float-end"
                src={PF + user.profilePicture}
                alt={user.profilePicture}
              />
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}

export default TopBar;

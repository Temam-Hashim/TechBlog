import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Home.css";
// import axios for api data fetch we can also use "javascript fetch"
import { useState, useEffect } from "react";
import axios from "axios";
// import http from "./../../components/http/http";
import { useLocation } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const id = setInterval(() => {
      const fetchPosts = async () => {
        const res = await axios.get("/posts" + search);
        setPosts(res.data);
      };
      fetchPosts();
    }, 400);
    return () => clearInterval(id);
  }, [search]);

  return (
    <>
      <Header />
      <div className="row home">
        {/* posts */}
        {posts.length === 0 ? (
          <div className="col-md-9 text-center">
            <span className="noPost">
              {"NO POST FOUND FOR YOUR SEARCH KEYWORD : " +
                search.split("=")[1]}
            </span>
          </div>
        ) : (
          <Posts posts={posts} />
        )}

        {/* sidebar */}
        <Sidebar />
      </div>
    </>
  );
}

export default Home;

import { useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./SinglePost.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

const SinglePost = () => {
  const { user } = useContext(Context);
  const PF = "http://localhost:5005/images/";
  const [singlePost, setSinglePost] = useState([]);
  const [comments, setComments] = useState([]);
  const [authorInput, setAuthorInput] = useState([]);
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  // use axios to fetch your data with the post id
  // get post by id
  useEffect(() => {
    const getPostById = async () => {
      const res = await axios.get("/posts/" + postId);
      setSinglePost(res.data);
    };
    getPostById();
  }, [postId]);

  // const [author, setAuthor] = useState([]);
  // const getUsername = async () => {
  //   const response = await axios.get("/username", {
  //     data: { username: user.username },
  //   });
  //   setAuthor(response.data);
  // };
  // getUsername();
  // console.log(author);

  const deletePost = async () => {
    try {
      await axios.delete("/posts/" + singlePost._id, {
        data: { username: user.username },
      });
      alert("Post Deleted Successfully");
      window.location.replace("/");
    } catch (error) {
      console.log(error);
      alert("Failed to delete post. try again!");
    }
  };
  // add comment
  const [commentInput, setCommentInput] = useState("");
  const [error, setError] = useState("");

  const handleComment = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/comments/", {
        author: authorInput,
        message: commentInput,
        postId: postId,
      });
      if (res.data) {
        setError("comment created...");
      }
    } catch (error) {
      console.log(error);
      setError("comment not created..");
    }
  };

  // get comment
  useEffect(() => {
    const id = setInterval(() => {
      axios.get("/comments/" + postId).then((res) => {
        setComments(res.data);
      });
    }, 1000);
    return () => clearInterval(id);
  }, [postId]);

  return (
    <div className="col-md-9 singlePost">
      <div className="singlePostWrapper">
        <h1 className="singlePostTitle">
          {singlePost.title}
          {singlePost.username === user?.username && (
            <div className="singlePostEdit">
              <Link className="Link" to={`/update/${singlePost._id}`}>
                <i className=" singlePostIcons fa-regular fa-pen-to-square"></i>
              </Link>
              <i
                className=" singlePostIcons fa-solid fa-trash"
                onClick={deletePost}
              ></i>
            </div>
          )}
        </h1>
        <div className="singlePostInfo">
          <Link to={`/?user=${singlePost.username}`} className="Link">
            <span className="singlePostAuthor">
              by: <b>{singlePost.username}</b>
            </span>
          </Link>
          <Link className="Link" to={`/?date=${singlePost.createdAt}`}>
            <span className="singlePostDate">
              {new Date(singlePost.createdAt).toDateString()}
            </span>
          </Link>
        </div>
        <img
          className="singlePostImage"
          src={singlePost.image && PF + singlePost.image}
          alt=""
        />
        <hr />
        <p className="singlePostDesc">{singlePost.desc}</p>
      </div>
      <hr />
      <div className="container">
        <ul className="tagList">
          {singlePost.tags?.map((tag) => (
            <Link to={`/?tag=${tag}`} className="Link" key={tag}>
              <li className="tagItem">#{tag}</li>
            </Link>
          ))}
        </ul>
      </div>
      <hr />
      <div className="row">
        <h5 className="authorTitle">Author</h5>
        <div className="col-md-3 imageCon">
          <img
            className="authorImage"
            src={"https://picsum.photos/200"}
            alt=""
          />
        </div>
        <div className="col-md-9 infoCon">
          <h2 className="authorName">{singlePost.username}</h2>
          <ul className="">
            <li className="infoItem">
              <i className="fa fa-phone infoIcon"></i> +251985673456
            </li>
            <li className="infoItem">
              <i className="fa fa-envelope infoIcon"></i> temxtech@gmail.com
            </li>
          </ul>
        </div>
      </div>
      <hr />
      {/* add comment section */}
      <span className="commentTitle">Add Comment</span>
      <div class="row commentSection">
        <div className="text-center alert alert-info alert-dismissible">
          {error}
        </div>
        <form onSubmit={handleComment} className="addComment col-md-12">
          <label className="label">Author</label>
          <input
            className="form-control commentInput"
            type="text"
            placeholder="add your name here..."
            onChange={(e) => setAuthorInput(e.target.value)}
            required
          />
          <label className="label">Comment</label>
          <input
            className="form-control commentInput"
            type="text"
            placeholder="add your comment here..."
            onChange={(e) => setCommentInput(e.target.value)}
          />

          <button type="submit" className="btn btn-md btn-info commentBtn">
            Submit
          </button>
        </form>
      </div>

      <hr />
      {/* comment section */}
      <span className="commentTitle">Comments ({comments.length})</span>
      {comments.length !== 0 ? (
        comments.map((c) => (
          <div class="commentList" key={c._id}>
            <img
              src={"https://picsum.photos/100"}
              class="commentImage"
              alt=""
            />
            <div class="comment-detail">
              <p>
                <span class="commentName">{c.author}</span>
                <small class="commentDate">
                  {new Date(c.createdAt).toDateString()}
                </small>
              </p>
              <span class="commentMessage">{c.message}</span>
            </div>
          </div>
        ))
      ) : (
        <div className="alert alert-info text-center">
          No comment for this post yet ...
        </div>
      )}
    </div>
  );
};

export default SinglePost;

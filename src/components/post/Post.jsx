import "./Post.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Post({ post }) {
  const PF = "http://localhost:5005/images/";
  const [commentCount, setCommentCount] = useState(0);
  // const [likeStatus, setLikeStatus] = useState([{ stat: false, id: "" }]);
  // const [loveStatus, setLoveStatus] = useState([{ stat: false, id: "" }]);

  // get comment
  useEffect(() => {
    axios.get("/comments/" + post._id).then((res) => {
      setCommentCount(res.data.length);
    });
  }, [post._id]);

  const handleLove = () => {
    axios.put("/posts/" + post._id, {
      love: post.love + 1,
    });
  };

  const handleLike = async () => {
    await axios.put("/posts/" + post._id, {
      like: post.like + 1,
    });
  };

  let like = post.like;
  let love = post.love;

  return (
    <div className="post">
      <div className="postInfo">
        <div className="postNews">
          <Link to={`/posts/${post._id}`} className="Link">
            <span className="postTitle">{post.title}</span>
          </Link>
          <div className="tagAuthor">
            <Link to={`/?date=${post.createdAt}`} className="Link">
              <span className="postDate">
                {new Date(post.createdAt).toDateString()}
              </span>
            </Link>
            <Link to={`/?user=${post.username}`} className="Link">
              <span className="postDate"> by {post.username}</span>
            </Link>
          </div>
        </div>
        {/* <div className="postCats">
          {post.tags.map((tag) => (
            <Link to={`/?tag=${tag}`} className="Link" key={tag}>
              <span className="postCat">{tag}</span>
            </Link>
          ))}
        </div> */}
      </div>
      <Link to={`/posts/${post._id}`} className="Link">
        <img
          className="postImg"
          src={post.image ? PF + post.image : "https://picsum.photos/200"}
          alt=""
        />
      </Link>
      <Link to={`/posts/${post._id}`} className="Link">
        <p className="posDesc">{post.desc}</p>
      </Link>
      {/* add comment like and love button */}
      <div
        className="commentLike"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <Link className="Link" to={`/posts/${post._id}`}>
          <span className="comment">Comment ({commentCount})</span>
        </Link>

        <div
          className="likeSection"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <span className="love">
            <i className="fa fa-heart" onClick={handleLove}>
              <small className="counter">{love}</small>
            </i>
          </span>
          <span className="like">
            <i className="fa fa-thumbs-up" onClick={handleLike}>
              <small className="counter">{like}</small>
            </i>
          </span>
        </div>
      </div>
      <hr />
    </div>
  );
}
export default Post;

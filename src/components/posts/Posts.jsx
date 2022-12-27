import Post from "../post/Post";
import "./Posts.css";

function Posts({ posts }) {
  return (
    <div className="posts col-md-9">
      {posts.map((p) => (
        <Post key={p._id} post={p} />
      ))}
    </div>
  );
}

export default Posts;

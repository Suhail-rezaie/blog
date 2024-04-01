// import Post from "../post/Post";
// import "./posts.css";

// export default function Posts({ posts }) {
//   return (
//     <div className="posts">
//       {posts.map((p) => (
//         <Post key={p._id} post={p}  />
//       ))}
//     </div>
//   );
// }


import Post from "../post/Post";
import "./posts.css";

export default function Posts({ posts }) {
  if (!Array.isArray(posts)) {
    // If posts is not an array, you can handle this situation accordingly.
    // For example, you can return a message indicating that there are no posts.
    return <div>No posts available</div>;
  }

  return (
    <div className="posts">
      {posts.map((p) => (
        <Post key={p._id} post={p}  />
      ))}
    </div>
  );
}

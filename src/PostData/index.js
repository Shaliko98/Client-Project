import React from "react";

const PostData = ({ post, onOpen }) => {
  return (
    <div key={post.id}>
      {post.id}
      <div onClick={() => onOpen(post.id)} style={{ cursor: "pointer" }}>
        {post.title}
      </div>
      {post.isOpen ? <div>{post.body}</div> : null}
    </div>
  );
};

export default PostData;

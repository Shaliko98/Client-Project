import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import PostData from "../PostData";

const HomePage = () => {
  const google = window.google;
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  function handleCallbackResponse(response) {
    const userObject = jwt_decode(response.credential);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  const getApiData = async () => {
    const response = await fetch("https://dummyjson.com/posts/").then(
      (response) => response.json()
    );

    setPosts(
      response.posts?.map((item) => {
        return {
          id: item.id,
          title: item.title,
          body: item.body,
          isOpen: false,
        };
      })
    );
  };

  const openPostsInfo = (id) => {
    const newPostsData = posts;

    newPostsData.map((item) => {
      if (item.id === id) {
        item.isOpen = !item.isOpen;
      }
    });

    setPosts([...newPostsData]);
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "944574118139-mvsb2sasuet7vgk15lv78em0rgkpvgqv.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });

    getApiData();
  }, [google.accounts.id]);

  return (
    <div>
      <div id="signInDiv"></div>
      {Object.keys(user).length != 0 && (
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      )}
      {user && (
        <div>
          <img src={user.picture} />
          <h3>{user.name}</h3>
        </div>
      )}
      {Object.keys(user).length != 0 &&
        posts.map((post) => (
          <div key={post.id}>
            <PostData post={post} onOpen={openPostsInfo} />
          </div>
        ))}
    </div>
  );
};

export default HomePage;

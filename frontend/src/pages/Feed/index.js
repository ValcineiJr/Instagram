import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import comment from "../../assets/comment.svg";
import like from "../../assets/like.svg";
import more from "../../assets/more.svg";
import send from "../../assets/send.svg";
import api from "../../services/api";
import "./styles.css";

export default function Feed() {
  const [feed, setFeed] = useState([]);

  function registerToSocket(data) {
    const socket = io("http://localhost:3333");
    socket.on("post", (newPost) => {
      setFeed([newPost, ...data]);
    });

    socket.on("like", (likePost) => {
      setFeed(
        data.map((post) => (post._id === likePost._id ? likePost : post))
      );
    });
  }

  useEffect(() => {
    api.get("posts").then((res) => {
      const data = res.data.posts;
      setFeed(data);
      registerToSocket(data);
    });
  }, []);

  function handleLike(id) {
    api.get(`/posts/${id}/like`);
  }

  return (
    <section id="post-list">
      {feed.map((post) => (
        <article key={post._id}>
          <header>
            <div className="user-info">
              <span>{post.author}</span>
              <span className="place">{post.place}</span>
            </div>
            <img src={more} alt="mais" />
          </header>
          <img src={`http://localhost:3333/files/${post.image}`} alt="" />

          <footer>
            <div className="actions">
              <button type="button" onClick={() => handleLike(post._id)}>
                <img src={like} alt="" />
              </button>
              <img src={comment} alt="" />
              <img src={send} alt="" />
            </div>

            <strong>{post.likes} curtidas</strong>
            <p>
              {post.description}
              <span>{post.hashtags}</span>
            </p>
          </footer>
        </article>
      ))}
    </section>
  );
}

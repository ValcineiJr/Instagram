import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import "./styles.css";

export default function NewPost() {
  const [image, setImage] = useState(null);
  const [hashtags, setHashtags] = useState("");
  const [author, setAuthor] = useState("");
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();

    data.append("image", image);
    data.append("author", author);
    data.append("place", place);
    data.append("description", description);
    data.append("hashtags", hashtags);

    await api.post("posts", data);
    history.push("/");
  }

  return (
    <form onSubmit={handleSubmit} id="new-post">
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />

      <input
        type="text"
        onChange={(e) => setAuthor(e.target.value)}
        value={author}
        name="author"
        placeholder="Autor do Post"
      />
      <input
        type="text"
        name="place"
        onChange={(e) => setPlace(e.target.value)}
        value={place}
        placeholder="Local do post"
      />
      <input
        type="text"
        name="description"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        placeholder="Descrição"
      />
      <input
        type="text"
        name="hashtags"
        onChange={(e) => setHashtags(e.target.value)}
        value={hashtags}
        placeholder="Hashtags"
      />
      <button type="submit">Enviar</button>
    </form>
  );
}

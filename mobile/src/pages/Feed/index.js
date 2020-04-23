import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import io from "socket.io-client";
import camera from "../../assets/camera.png";
import comment from "../../assets/comment.png";
import like from "../../assets/like.png";
import more from "../../assets/more.png";
import send from "../../assets/send.png";
import api from "../../services/api";

// import { Container } from './styles';

export default function Feed() {
  const navigation = useNavigation();
  const [feed, setFeed] = useState([]);

  function registerToSocket(data) {
    const socket = io("http://10.0.3.2:3333");
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

  function CameraIcon() {
    return (
      <TouchableNativeFeedback
        onPress={() => {
          navigation.navigate("New");
        }}
      >
        <Image style={{ marginRight: 20 }} source={camera} />
      </TouchableNativeFeedback>
    );
  }

  function Post({ data }) {
    return (
      <View style={styles.feedItem}>
        <View style={styles.feedItemHeader}>
          <View style={styles.userInfo}>
            <Text style={styles.name}>{data.author}</Text>
            <Text style={styles.place}>{data.place}</Text>
          </View>

          <Image source={more} />
        </View>
        <Image
          style={styles.feedImage}
          source={{ uri: `http://10.0.3.2:3333/files/${data.image}` }}
        />
        <View style={styles.feedItemFooter}>
          <View style={styles.actions}>
            <TouchableNativeFeedback onPress={() => handleLike(data._id)}>
              <Image style={styles.action} source={like} />
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => {}}>
              <Image style={styles.action} source={comment} />
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => {}}>
              <Image style={styles.action} source={send} />
            </TouchableNativeFeedback>
          </View>
          <Text style={styles.like}>{data.likes} curtidas</Text>
          <Text style={styles.description}>{data.description}</Text>
          <Text style={styles.hashtags}>{data.hashtags}</Text>
        </View>
      </View>
    );
  }

  navigation.setOptions({
    headerRight: (props) => <CameraIcon {...props} />,
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={feed}
        keyExtractor={(post) => post._id}
        renderItem={({ item }) => <Post data={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  feedItem: {
    marginTop: 20,
  },
  feedItemHeader: {
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    color: "#000",
  },
  place: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  feedImage: {
    width: "100%",
    height: 400,
    marginVertical: 15,
  },
  feedItemFooter: {
    paddingHorizontal: 15,
  },
  actions: {
    flexDirection: "row",
  },
  action: {
    marginRight: 8,
  },
  likes: {
    marginTop: 15,
    fontWeight: "bold",
    color: "#000",
  },
  description: {
    lineHeight: 18,
    color: "#000",
  },
  hashtags: {
    color: "#7159c1",
  },
});

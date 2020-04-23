import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import api from "../../services/api";

export default function New() {
  const navigation = useNavigation();
  const [author, setAuthor] = useState("");
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const [hashtags, setHashtags] = useState("");

  navigation.setOptions({
    headerTitle: "Nova Publicação",
  });

  async function handleSubmit() {
    const data = new FormData();

    data.append("image", image);
    data.append("author", author);
    data.append("place", place);
    data.append("description", description);
    data.append("hashtags", hashtags);

    await api.post("posts", data);
    navigation.navigate("Home");
  }

  async function handleSelectImage() {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();

      if (permission.status) {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.cancelled) {
          const uri = result.uri;
          let name = uri.split("/");
          name = name[name.length - 1];
          let prefix;
          let ext;

          [prefix, ext] = name.split(".");
          ext = "jpg";
          name = `${prefix}.${ext}`;

          const imageInfo = {
            path: uri,
            mimetype: result.type,
            filename: "cu.jpg",
          };

          setImage(result.uri);
          setPreview({ uri: result.uri });
        } else {
          console.log("Cancelou");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.selectButton} onPress={handleSelectImage}>
        <Text style={styles.selectButtonText}>Selecionar Imagem</Text>
      </TouchableOpacity>

      {preview && <Image style={styles.preview} source={preview} />}

      <TextInput
        style={styles.input}
        autoCapitalize="none"
        placeholder="Nome do autor"
        placeholderTextColor="#999"
        autoCorrect={false}
        onChangeText={(txt) => setAuthor(txt)}
        value={author}
      />
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        placeholder="Local"
        placeholderTextColor="#999"
        autoCorrect={false}
        onChangeText={(txt) => setPlace(txt)}
        value={place}
      />
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        placeholder="Descrição"
        placeholderTextColor="#999"
        autoCorrect={false}
        onChangeText={(txt) => setDescription(txt)}
        value={description}
      />
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        placeholder="Hashtags"
        placeholderTextColor="#999"
        autoCorrect={false}
        onChangeText={(txt) => setHashtags(txt)}
        value={hashtags}
      />

      <TouchableOpacity style={styles.shareButton} onPress={handleSubmit}>
        <Text style={styles.shareButtonText}>Compartilhar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  selectButton: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "dashed",
    height: 42,

    justifyContent: "center",
    alignItems: "center",
  },
  selectButtonText: {
    fontSize: 16,
    color: "#666",
  },
  preview: {
    width: 100,
    height: 100,
    marginTop: 10,
    alignSelf: "center",
    borderRadius: 4,
  },
  shareButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    backgroundColor: "#7159c1",
    borderRadius: 4,
    height: 42,
  },
  shareButtonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
  },
  input: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    marginTop: 10,
    fontSize: 16,
  },
});

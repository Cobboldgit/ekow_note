import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
} from "react-native";

export const apiLink = "https://api.pwdevtest.com/records";

export const uuid = (keyLength) => {
  var chars =
    '0123456789abcdefghijklmnopqrstuvwxyz-ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var key = '';
  for (var i = 0; i <= keyLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    key += chars.substring(randomNumber, randomNumber + 1);
  }

  return key;
}

export default function App() {
  const [notes, setNotes] = useState([]);
  const [currentDisplay, setCurrentDisplay] = useState("archive");
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("Name/Title");
  const [description, setDescription] = useState("Description here");

  const handleSwitchDisplay = () => {
    if (currentDisplay === "archive") {
      setCurrentDisplay("notes");
    } else {
      setCurrentDisplay("archive");
    }
  };

  const handleAddNotePressed = () => {
    setModalVisible(!modalVisible);
  };

  const fetchNotes = () => {
    fetch(apiLink)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setNotes(result);
        console.log(result);
      });
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmitNote = () => {
    const date = new Date();
    let dataToSubmit = {
      key: uuid(30),
      name: title,
      description: description,
      priority: 2,
      archived: false,
      updatedAt: date.toISOString(),
      createdAt: date.toISOString(),
    };

    const d = JSON.stringify(dataToSubmit);

    fetch(apiLink, {
      method: "post",
      body: d,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
      });
  };

  const renderModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        statusBarTranslucent
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: `rgba(0,0,0,0.3)`,
            paddingHorizontal: 16,
          }}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "column",
            }}
          >
            <View
              style={{
                backgroundColor: "#d9d9d9",
                borderRadius: 20,
                padding: 30,
              }}
            >
              <TextInput
                style={{
                  fontSize: 30,
                  fontWeight: "700",
                  paddingVertical: 20,
                }}
                value={title}
                name="title"
                onChangeText={(text) => setTitle(text)}
              />
              <TextInput
                style={{
                  fontSize: 18,
                }}
                value={description}
                name="description"
                onChangeText={(text) => setDescription(text)}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Image source={require("./assets/components/Group_3-2.png")} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSubmitNote()}>
                <Image source={require("./assets/components/Group_2.png")} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {renderModal()}
      <TouchableOpacity onPress={handleSwitchDisplay}>
        {currentDisplay === "archive" ? (
          <Image source={require("./assets/components/Group_3.png")} />
        ) : (
          <Image source={require("./assets/components/Group_3-1.png")} />
        )}
      </TouchableOpacity>
      <FlatList
        style={{
          paddingHorizontal: 16,
          marginTop: 30,
        }}
        data={notes}
        keyExtractor={(item, index) => `key_${item.key}_${index}`}
        renderItem={({ item }) => {
          if (currentDisplay === "archive" && item.archived === true) {
            return (
              <View
                style={{
                  backgroundColor: "#e8e8e8",
                  borderRadius: 20,
                  marginVertical: 10,
                  paddingHorizontal: 40,
                  paddingVertical: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 25,
                    color: "black",
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: "black",
                  }}
                >
                  {item.description}
                </Text>
              </View>
            );
          } else if (currentDisplay === "notes" && item.archived === false) {
            return (
              <View
                style={{
                  backgroundColor: "#e8e8e8",
                  borderRadius: 20,
                  marginVertical: 10,
                  paddingHorizontal: 40,
                  paddingVertical: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 25,
                    color: "black",
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: "black",
                  }}
                >
                  {item.description}
                </Text>
              </View>
            );
          }
        }}
      />
      <TouchableOpacity
        onPress={() => handleAddNotePressed()}
        style={{
          position: "absolute",
          bottom: 40,
          right: 30,
          zIndex: 100,
        }}
      >
        <Image source={require("./assets/components/Group_10.png")} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 50,
    // justifyContent: "center",
  },
});

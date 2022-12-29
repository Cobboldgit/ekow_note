import { StatusBar } from "expo-status-bar";
import { Fragment, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import FilesCard from "./componets/FilesCard";
import ListCard from "./componets/ListCard";

export const apiLink = "https://api.pwdevtest.com/records";

export const uuid = (keyLength) => {
  var chars = "0123456789abcdefghijklmnopqrstuvwxyz-ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var key = "";
  for (var i = 0; i <= keyLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    key += chars.substring(randomNumber, randomNumber + 1);
  }

  return key;
};

export default function App() {
  const [notes, setNotes] = useState([]);
  const [currentDisplay, setCurrentDisplay] = useState("notes");
  const [files, setFiles] = useState([]);
  const [showFiles, setShowFiles] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showNoteDetailsModal, setShowNoteDetailsModal] = useState(false);
  const [title, setTitle] = useState("Name/Title");
  const [description, setDescription] = useState("Description here");
  const [selectedNote, setSelectedNote] = useState(null);

  const handleSwitchDisplay = () => {
    if (currentDisplay === "notes") {
      setCurrentDisplay("archive");
    } else {
      setCurrentDisplay("notes");
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
        alert("Note Saved");
        setModalVisible(!modalVisible);
      });
  };

  // note pressed
  const handleNotePressed = (note) => {
    // get pressed note data and set to this state
    setSelectedNote(note);
    setShowNoteDetailsModal(!showNoteDetailsModal);
  };

  // view files pressed

  const handleViewFilesPressed = (id) => {
    setShowFiles(!showFiles);

    fetch(apiLink + `/${2}/files`)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setFiles(result);
        console.log(result);
      });
  };

  // =================================================================================
  // =================================================================================
  // =================================================================================
  // ===========================Modals ===============================================
  // =================================================================================
  // =================================================================================
  // =================================================================================
  // =================================================================================

  //  note details modal

  const renderShowNoteDetailsModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={showNoteDetailsModal}
        statusBarTranslucent
        onRequestClose={() => {
          setShowNoteDetailsModal(!showNoteDetailsModal);
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
              {showFiles === false ? (
                <Fragment>
                  <TouchableOpacity
                    onPress={() => handleViewFilesPressed(selectedNote?.id)}
                  >
                    <Text
                      style={{
                        color: "blue",
                        textDecorationLine: "underline",
                        fontSize: 18,
                      }}
                    >
                      View files
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 30,
                      fontWeight: "700",
                      paddingVertical: 20,
                    }}
                  >
                    {selectedNote?.name}
                  </Text>
                  <ScrollView>
                    <Text
                      style={{
                        fontSize: 18,
                      }}
                    >
                      {selectedNote?.description}
                    </Text>
                  </ScrollView>
                </Fragment>
              ) : (
                <ScrollView>
                  <TouchableOpacity onPress={() => setShowFiles(!showFiles)}>
                    <Text
                      style={{
                        color: "blue",
                        textDecorationLine: "underline",
                        fontSize: 18,
                      }}
                    >
                      go back
                    </Text>
                  </TouchableOpacity>
                  {files.map((item, index) => {
                    return <FilesCard item={item} />;
                  })}
                </ScrollView>
              )}
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
                  setShowNoteDetailsModal(!showNoteDetailsModal);
                }}
              >
                <Image source={require("./assets/components/Group_3-2.png")} />
              </TouchableOpacity>
              <View></View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  // add note modal
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
                multiline={true}
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
                multiline={true}
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

  // =================================================================================
  // =================================================================================
  // =================================================================================
  // ===========================Modals end ===========================================
  // =================================================================================
  // =================================================================================
  // =================================================================================
  // =================================================================================

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {renderShowNoteDetailsModal()}
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
              <ListCard
                name={item.name}
                description={item.description}
                onPress={() => handleNotePressed(item)}
              />
            );
          } else if (currentDisplay === "notes" && item.archived === false) {
            return (
              <ListCard
                name={item.name}
                description={item.description}
                onPress={() => handleNotePressed(item)}
              />
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

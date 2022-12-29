import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";

const FilesCard = ({ item, onPress }) => {
  // get file extension function

  const uri = item?.location;

  const getFileExtention = (fileUrl) => {
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  };

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container]}>
      <View style={styles.leftContainer}>
        <Image
          source={
            getFileExtention(uri).toLocaleString().toLowerCase() === "pdf"
              ? require("../assets/icons/icons8-pdf-50.png")
              : getFileExtention(uri).toLocaleString().toLowerCase() ===
                  "jpeg" ||
                getFileExtention(uri).toLocaleString().toLowerCase() ===
                  "png" ||
                getFileExtention(uri).toLocaleString().toLowerCase() === "jpg"
              ? require("../assets/icons/icons8-image-file-50.png")
              : getFileExtention(uri).toLocaleString().toLowerCase() === "mp4"
              ? require("../assets/icons/icons8-video-file-50.png")
              : require("../assets/icons/icons8-file-50.png")
          }
          style={{
            height: 45,
            width: 45,
          }}
        />
      </View>
      <View style={styles.rightContainer}>
        <View>
          <Text numberOfLines={1} style={[styles.headerText]}>
            {item?.name}
          </Text>
          <Text numberOfLines={1} style={styles.description}>
            {item?.size + "mb" || "No size"}
          </Text>
        </View>
        <View></View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    justifyContent: "center",
    padding: 20,
    borderColor: "#e6e6e6",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
  },

  headerText: {
    fontSize: 20,
    fontWeight: "700",
    color: "black",
  },

  description: {
    color: "#d9d9d9",
    marginTop: 10,
    fontSize: 16,
  },

  leftContainer: {
    flex: 1.8,
    justifyContent: "center",
  },
  rightContainer: {
    flex: 8.2,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default FilesCard;

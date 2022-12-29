import { View, Text } from "react-native";
import React, { Fragment, useEffect } from "react";
import * as FileSystem from "expo-file-system";
import * as Linking from "expo-linking";

const OpenFile = (url) => {
  // get file name
  const getFileName = () => {
    const fileNameArray = url.split("/");
    const fileName = fileNameArray[fileNameArray.length - 1];
    return fileName.split(".");
  };

  // get file extension
  const getFileExtention = (fileUrl) => {
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  };

  useEffect(() => {
    if (url) {
      let date = new Date();
      let remoteUrl = url;

      let file_ext = getFileExtention(remoteUrl);
      let file_name = getFileName()[0];
      file_ext = "." + file_ext[0];

      let localPath =
        file_name != null
          ? `${FileSystem.documentDirectory}/${file_name}${file_ext}`
          : `${FileSystem.documentDirectory}/${Math.floor(
              date.getTime() + date.getSeconds() / 2
            )}${file_ext}`;

      FileSystem.downloadAsync(remoteUrl, localPath)
        .then(({ uri }) =>
          Linking.openURL(uri)
            .then(() => {
              console.log("link opening");
            })
            .catch((e) => {
              console.log(e);
            })
        )
        .then(() => {
          console.log("ok");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [url]);

  return <Fragment></Fragment>;
};

export default OpenFile;

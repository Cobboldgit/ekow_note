import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const ListCard = ({ name, description, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
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
        {name}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          fontSize: 16,
          color: "black",
        }}
      >
        {description}
      </Text>
    </TouchableOpacity>
  );
};

export default ListCard;

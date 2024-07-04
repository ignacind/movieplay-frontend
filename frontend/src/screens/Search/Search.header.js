import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import SearchIcon from "../../assets/images/search_btn_black.svg";
import { styles } from "./Search.styles";

export default function SearchHeader({
  inputRef,
  searchInput,
  setSearchInput,
  handleSearch,
}) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.searchIcon}>
        <TouchableOpacity
          style={styles.searchIcon.btn}
          onPress={() => handleSearch(true)}
        >
          <SearchIcon width={28} height={28} />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          onChangeText={(text) => setSearchInput(text)}
          style={styles.inputText}
          placeholder="Buscar Película o Actor"
          onSubmitEditing={() => handleSearch(true)}
          placeholderTextColor={"#303030"}
        />
      </View>
    </View>
  );
}

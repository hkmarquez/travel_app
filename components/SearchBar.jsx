import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../styles/createStyles';

const SearchBar = ({ query, onChange, onClear }) => {
  return (
    <View style={styles.searchBar}>
      <Icon name="search" size={18} color="#666" style={{ marginRight: 8 }} />

      <TextInput
        value={query}
        onChangeText={onChange}
        placeholder="Search places"
        placeholderTextColor="#999"
        style={styles.searchInput}
      />

      {query.length > 0 && (
        <TouchableOpacity onPress={onClear}>
          <Icon name="close" size={16} color="#999" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;

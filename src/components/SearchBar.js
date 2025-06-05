import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = () => {
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <Ionicons name="search" size={18} color="#1a1a1a" style={styles.icon} />
      <TextInput style={styles.input}
        placeholder="Pesquisar"
        value={search}
        onChangeText={setSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#c3d6e6',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center',
    margin: 10,
    TextColor:"#1a1a1a",
  },
  icon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#2C3E50',
  },
});

export default SearchBar;

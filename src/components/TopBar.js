import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const TopBar = () => {
  return (
    <View style={styles.topBar}>


      <Text style={styles.topTitle}>ByteBox</Text>

      <TouchableOpacity>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1827/1827392.png' }}
          style={styles.topIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    height: 100,
    backgroundColor: '#2d3a4b',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  flagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 6,
    paddingVertical: 2,
    gap: 4,
  },
  flag: {
    width: 24,
    height: 16,
    borderRadius: 2,
  },
  currency: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  topTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  topIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
});

export default TopBar;

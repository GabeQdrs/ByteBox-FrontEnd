import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const couponsData = [
  { id: '1', title: 'FRETE GRÁTIS', valid: 'Válido até 10/2025' },
  { id: '2', title: 'FRETE GRÁTIS', valid: 'Válido até 10/2025' },
  { id: '3', title: 'FRETE GRÁTIS', valid: 'Válido até 10/2025' },
  { id: '4', title: 'FRETE GRÁTIS', valid: 'Válido até 10/2025' },
];

export default function CouponsScreen() {
  const [claimed, setClaimed] = useState({});

  const handlePress = (id) => {
    setClaimed((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.couponContainer}
      onPress={() => handlePress(item.id)}
      activeOpacity={0.8}
    >
      <View style={styles.left}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.valid}>{item.valid}</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.right}>
        <Text style={[styles.claimText, claimed[item.id] && styles.claimed]}>
          {claimed[item.id] ? 'RESGATADO' : 'USAR\nAGORA'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={couponsData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF0F1',
  },
  couponContainer: {
    flexDirection: 'row',
    backgroundColor: '#ECF0F1',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',

    
  },
  left: {
    flex: 1,
    
  
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#1c1c1c',
    
  },
  valid: {
    fontSize: 12,
    marginTop: 5,
    color: '#333',
  },
  separator: {
    width: 1,
    height: '100%',
    backgroundColor: '#7da2b6',
    marginHorizontal: 15,
    borderStyle: 'dashed',
    borderLeftWidth: 1,
  },
  right: {
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  claimText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#2b3e50',
  },
  claimed: {
    color: 'green',
  },
});
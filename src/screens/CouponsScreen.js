import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const couponsData = [
  { id: '1', title: 'FRETE GRÁTIS', valid: 'Válido até 10/2025' },
  { id: '2', title: '50% DESCONTO', valid: 'Válido até 11/2025' },
  { id: '3', title: 'COMPRE 1 LEVE 1', valid: 'Válido até 09/2025' },
  { id: '4', title: 'R$10 OFF', valid: 'Válido até 12/2025' },
];

export default function CouponsScreen() {
  
  const [claimedCoupons, setClaimedCoupons] = useState({});

  
  const handlePress = (id) => {
    setClaimedCoupons(prev => {
      if (!prev[id]) {
        return {
          ...prev,
          [id]: true 
        };
      }
      return prev; 
    });
  };

  // Renderiza cada item de cupom na FlatList.
  const renderItem = ({ item }) => {
    // Verifica se o cupom atual está no objeto de cupons resgatados.
    const isClaimed = claimedCoupons[item.id];

    return (
      <TouchableOpacity
        // Aplica o estilo base e, condicionalmente, o estilo de cupom resgatado
        style={[styles.couponContainer, isClaimed && styles.claimedCouponContainer]}
        onPress={() => handlePress(item.id)}
        activeOpacity={isClaimed ? 1 : 0.8} // Desativa o feedback visual se já resgatado
        disabled={isClaimed} // Desabilita o toque se já resgatado
      >
        <View style={styles.left}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.valid}>{item.valid}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.right}>
          {/* Aplica o estilo de texto base e, condicionalmente, o estilo de texto resgatado */}
          <Text style={[styles.claimText, isClaimed && styles.claimedText]}>
            {isClaimed ? 'RESGATADO' : 'USAR\nAGORA'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={couponsData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF0F1',
  },
  flatListContent: {
    padding: 20,
  },
  couponContainer: {
    flexDirection: 'row',
    backgroundColor: '#A9CCE3',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ECF0F1',
  },
  claimedCouponContainer: {
    backgroundColor: '#A9CCE3', 
    borderColor: '#A9A9A9', 
    borderWidth: 1, 
    elevation: 2, 
    shadowOpacity: 0.05,
    opacity: 0.7, 
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
    color: '#555',
  },
  separator: {
    width: 1,
    height: '100%',
    backgroundColor: '#CCD1D1',
    marginHorizontal: 15,
    borderStyle: 'dashed',
    borderLeftWidth: 1,
    borderRadius: 1,
  },
  right: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  claimText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 13,
    color: '#34495E',
    lineHeight: 18,
  },
  claimedText: {
    color: '#696969', // Cor cinza para o texto "RESGATADO"
  },
});
